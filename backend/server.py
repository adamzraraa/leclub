from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import Optional, Dict, List
import os
import datetime
import uuid
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = AsyncIOMotorClient(os.environ.get("MONGO_URL"))
db = client.leclub

# Stripe integration
stripe_checkout = StripeCheckout(api_key=os.environ.get("STRIPE_SECRET_KEY"))

# Payment packages for restaurant
MENU_PACKAGES = {
    "brunch_oriental": {"name": "Brunch Oriental", "price": 28.0, "description": "Délicieux brunch avec spécialités marocaines"},
    "menu_semaine": {"name": "Menu Semaine", "price": 18.0, "description": "Menu du jour avec plat principal et dessert"},
    "formule_entree_plat": {"name": "Entrée + Plat", "price": 22.0, "description": "Formule complète entrée et plat principal"},
    "formule_plat_dessert": {"name": "Plat + Dessert", "price": 20.0, "description": "Formule plat principal et dessert"},
    "menu_complet": {"name": "Menu Complet", "price": 32.0, "description": "Menu complet 3 services: entrée, plat, dessert"}
}

EVENT_PACKAGES = {
    "package_essentiel": {"name": "Package Essentiel", "price": 45.0, "description": "Menu 3 services, décoration de base", "deposit_rate": 0.30},
    "package_premium": {"name": "Package Premium", "price": 65.0, "description": "Menu 5 services, décoration raffinée", "deposit_rate": 0.30},
    "package_royal": {"name": "Package Royal", "price": 95.0, "description": "Menu gastronomique, service conciergerie", "deposit_rate": 0.30}
}

# Models
class PaymentTransaction(BaseModel):
    transaction_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: Optional[str] = None
    payment_type: str  # "menu" or "event" or "event_deposit"
    package_id: str
    amount: float
    currency: str = "eur"
    payment_status: str = "pending"  # pending, paid, failed, expired
    metadata: Optional[Dict] = None
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    customer_email: Optional[str] = None
    customer_name: Optional[str] = None
    event_details: Optional[Dict] = None  # For events: date, guests, etc.

class MenuPaymentRequest(BaseModel):
    package_id: str
    origin_url: str
    customer_email: Optional[str] = None
    customer_name: Optional[str] = None

class EventPaymentRequest(BaseModel):
    package_id: str
    origin_url: str
    payment_type: str = "deposit"  # "deposit" or "full"
    guests: int
    event_date: str
    customer_email: str
    customer_name: str
    event_details: Optional[str] = None

class StatusUpdateModel(BaseModel):
    name: str
    status: str

# Health check endpoints
@app.get("/api/")
async def root():
    return {"message": "Le Club Restaurant API", "status": "operational"}

@app.post("/api/status")
async def create_status(status: StatusUpdateModel):
    result = await db.status_checks.insert_one({
        "name": status.name,
        "status": status.status,
        "timestamp": datetime.datetime.now()
    })
    return {"message": "Status created", "id": str(result.inserted_id)}

@app.get("/api/status")
async def get_status():
    status_checks = await db.status_checks.find().to_list(100)
    for check in status_checks:
        check["_id"] = str(check["_id"])
    return status_checks

# Payment endpoints

@app.get("/api/payments/packages")
async def get_packages():
    """Get all available packages for menu and events"""
    return {
        "menu_packages": MENU_PACKAGES,
        "event_packages": EVENT_PACKAGES
    }

@app.post("/api/payments/menu/checkout")
async def create_menu_checkout(request: MenuPaymentRequest):
    """Create checkout session for menu order"""
    try:
        # Validate package
        if request.package_id not in MENU_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid package ID")
        
        package = MENU_PACKAGES[request.package_id]
        amount = package["price"]
        
        # Create success and cancel URLs
        success_url = f"{request.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/menu"
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency="eur",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "payment_type": "menu",
                "package_id": request.package_id,
                "package_name": package["name"],
                "customer_email": request.customer_email or "",
                "customer_name": request.customer_name or ""
            }
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create transaction record
        transaction = PaymentTransaction(
            session_id=session.session_id,
            payment_type="menu",
            package_id=request.package_id,
            amount=amount,
            currency="eur",
            payment_status="pending",
            customer_email=request.customer_email,
            customer_name=request.customer_name,
            metadata={
                "package_name": package["name"],
                "description": package["description"]
            }
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        return {"checkout_url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/payments/event/checkout")
async def create_event_checkout(request: EventPaymentRequest):
    """Create checkout session for event booking"""
    try:
        # Validate package
        if request.package_id not in EVENT_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid event package ID")
        
        package = EVENT_PACKAGES[request.package_id]
        base_amount = package["price"] * request.guests
        
        # Calculate amount based on payment type
        if request.payment_type == "deposit":
            amount = base_amount * package["deposit_rate"]
            payment_description = f"Acompte 30% - {package['name']}"
        else:
            amount = base_amount
            payment_description = f"Paiement complet - {package['name']}"
        
        # Create success and cancel URLs
        success_url = f"{request.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/events"
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency="eur",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "payment_type": f"event_{request.payment_type}",
                "package_id": request.package_id,
                "package_name": package["name"],
                "customer_email": request.customer_email,
                "customer_name": request.customer_name,
                "guests": str(request.guests),
                "event_date": request.event_date,
                "base_amount": str(base_amount),
                "is_deposit": str(request.payment_type == "deposit")
            }
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create transaction record
        transaction = PaymentTransaction(
            session_id=session.session_id,
            payment_type=f"event_{request.payment_type}",
            package_id=request.package_id,
            amount=amount,
            currency="eur",
            payment_status="pending",
            customer_email=request.customer_email,
            customer_name=request.customer_name,
            event_details={
                "guests": request.guests,
                "event_date": request.event_date,
                "base_amount": base_amount,
                "is_deposit": request.payment_type == "deposit",
                "event_details": request.event_details
            },
            metadata={
                "package_name": package["name"],
                "description": payment_description
            }
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        return {
            "checkout_url": session.url, 
            "session_id": session.session_id,
            "amount": amount,
            "description": payment_description
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/payments/status/{session_id}")
async def check_payment_status(session_id: str):
    """Check payment status and update database"""
    try:
        # Get status from Stripe
        status_response: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Find transaction in database
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        # Update transaction status if it has changed
        if transaction["payment_status"] != status_response.payment_status and status_response.payment_status == "paid":
            # Only update to 'paid' once to prevent double processing
            await db.payment_transactions.update_one(
                {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                {
                    "$set": {
                        "payment_status": status_response.payment_status,
                        "updated_at": datetime.datetime.now()
                    }
                }
            )
            
            # If this is a successful event deposit payment, create reminder for final payment
            if (status_response.payment_status == "paid" and 
                transaction["payment_type"] == "event_deposit"):
                await create_final_payment_reminder(transaction)
        
        return {
            "session_id": session_id,
            "payment_status": status_response.payment_status,
            "status": status_response.status,
            "amount_total": status_response.amount_total,
            "currency": status_response.currency,
            "metadata": status_response.metadata
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/payments/transactions")
async def get_transactions(customer_email: Optional[str] = None):
    """Get payment transactions, optionally filtered by customer email"""
    try:
        query = {}
        if customer_email:
            query["customer_email"] = customer_email
            
        transactions = await db.payment_transactions.find(query).sort("created_at", -1).to_list(100)
        for transaction in transactions:
            transaction["_id"] = str(transaction["_id"])
            
        return transactions
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def create_final_payment_reminder(deposit_transaction):
    """Create a reminder for final payment after deposit"""
    try:
        event_details = deposit_transaction.get("event_details", {})
        base_amount = event_details.get("base_amount", 0)
        deposit_amount = deposit_transaction["amount"]
        remaining_amount = base_amount - deposit_amount
        
        reminder = {
            "customer_email": deposit_transaction["customer_email"],
            "customer_name": deposit_transaction["customer_name"],
            "package_id": deposit_transaction["package_id"],
            "event_date": event_details.get("event_date"),
            "deposit_amount": deposit_amount,
            "remaining_amount": remaining_amount,
            "total_amount": base_amount,
            "reminder_status": "pending",
            "created_at": datetime.datetime.now()
        }
        
        await db.payment_reminders.insert_one(reminder)
        
    except Exception as e:
        print(f"Error creating payment reminder: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)