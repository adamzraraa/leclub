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