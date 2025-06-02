#!/usr/bin/env python3
import requests
import json
import sys
import time
from datetime import datetime

# Get the backend URL from the frontend .env file
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.strip().split('=')[1]
            break

# Base URL for API requests
BASE_URL = f"{BACKEND_URL}/api"

def test_root_endpoint():
    """Test the root endpoint"""
    print("\n🔍 Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "message" in response.json()
        assert "status" in response.json()
        assert response.json()["status"] == "operational"
        print("✅ Root endpoint test passed!")
        return True
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_create_status_check():
    """Test creating a status check"""
    print("\n🔍 Testing POST /api/status endpoint...")
    try:
        data = {"name": f"Test Status {datetime.now().isoformat()}", "status": "testing"}
        response = requests.post(f"{BASE_URL}/status", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "id" in response.json()
        print("✅ Create status check test passed!")
        return True, response.json()["id"]
    except Exception as e:
        print(f"❌ Create status check test failed: {str(e)}")
        return False, None

def test_get_status_checks():
    """Test getting status checks"""
    print("\n🔍 Testing GET /api/status endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/status")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json()[:2], indent=2)} ... (truncated)")
        
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        if len(response.json()) > 0:
            assert "_id" in response.json()[0]
            assert "name" in response.json()[0]
            assert "status" in response.json()[0]
        print("✅ Get status checks test passed!")
        return True
    except Exception as e:
        print(f"❌ Get status checks test failed: {str(e)}")
        return False

def test_get_packages():
    """Test the GET /api/payments/packages endpoint"""
    print("\n🔍 Testing GET /api/payments/packages endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/payments/packages")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 200
        assert "menu_packages" in response.json()
        assert "event_packages" in response.json()
        
        # Verify menu packages
        menu_packages = response.json()["menu_packages"]
        assert "brunch_oriental" in menu_packages
        assert "menu_semaine" in menu_packages
        assert "formule_entree_plat" in menu_packages
        assert "formule_plat_dessert" in menu_packages
        assert "menu_complet" in menu_packages
        
        # Verify event packages
        event_packages = response.json()["event_packages"]
        assert "package_essentiel" in event_packages
        assert "package_premium" in event_packages
        assert "package_royal" in event_packages
        
        print("✅ GET /api/payments/packages endpoint test passed!")
        return True
    except Exception as e:
        print(f"❌ GET /api/payments/packages endpoint test failed: {str(e)}")
        return False

def test_menu_checkout():
    """Test the POST /api/payments/menu/checkout endpoint"""
    print("\n🔍 Testing POST /api/payments/menu/checkout endpoint...")
    try:
        # Test data
        checkout_data = {
            "package_id": "brunch_oriental",
            "origin_url": BACKEND_URL,
            "customer_email": "test@example.com",
            "customer_name": "Test User"
        }
        
        response = requests.post(f"{BASE_URL}/payments/menu/checkout", json=checkout_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "checkout_url" in response.json()
        assert "session_id" in response.json()
        
        # Save session_id for later use
        session_id = response.json()["session_id"]
        print(f"Session ID: {session_id}")
        
        print("✅ POST /api/payments/menu/checkout endpoint test passed!")
        return True, session_id
    except Exception as e:
        print(f"❌ POST /api/payments/menu/checkout endpoint test failed: {str(e)}")
        return False, None

def test_event_checkout():
    """Test the POST /api/payments/event/checkout endpoint"""
    print("\n🔍 Testing POST /api/payments/event/checkout endpoint...")
    try:
        # Test data for deposit payment
        checkout_data = {
            "package_id": "package_premium",
            "origin_url": BACKEND_URL,
            "payment_type": "deposit",
            "guests": 10,
            "event_date": "2024-12-31",
            "customer_email": "event@example.com",
            "customer_name": "Event Organizer",
            "event_details": "New Year's Eve Party"
        }
        
        response = requests.post(f"{BASE_URL}/payments/event/checkout", json=checkout_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "checkout_url" in response.json()
        assert "session_id" in response.json()
        assert "amount" in response.json()
        assert "description" in response.json()
        
        # Save session_id for later use
        session_id = response.json()["session_id"]
        print(f"Session ID: {session_id}")
        
        # Test data for full payment
        checkout_data["payment_type"] = "full"
        
        response = requests.post(f"{BASE_URL}/payments/event/checkout", json=checkout_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "checkout_url" in response.json()
        assert "session_id" in response.json()
        assert "amount" in response.json()
        assert "description" in response.json()
        
        print("✅ POST /api/payments/event/checkout endpoint test passed!")
        return True, session_id
    except Exception as e:
        print(f"❌ POST /api/payments/event/checkout endpoint test failed: {str(e)}")
        return False, None

def test_payment_status(session_id):
    """Test the GET /api/payments/status/{session_id} endpoint"""
    print(f"\n🔍 Testing GET /api/payments/status/{session_id} endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/payments/status/{session_id}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "session_id" in response.json()
        assert "payment_status" in response.json()
        assert "status" in response.json()
        assert "amount_total" in response.json()
        assert "currency" in response.json()
        assert "metadata" in response.json()
        
        print("✅ GET /api/payments/status/{session_id} endpoint test passed!")
        return True
    except Exception as e:
        print(f"❌ GET /api/payments/status/{session_id} endpoint test failed: {str(e)}")
        return False

def test_transactions():
    """Test the GET /api/payments/transactions endpoint"""
    print("\n🔍 Testing GET /api/payments/transactions endpoint...")
    try:
        # Test without filter
        response = requests.get(f"{BASE_URL}/payments/transactions")
        print(f"Status Code: {response.status_code}")
        print(f"Response (first 2 items): {json.dumps(response.json()[:2], indent=2) if response.json() else '[]'}")
        
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        
        # Test with customer_email filter
        response = requests.get(f"{BASE_URL}/payments/transactions?customer_email=test@example.com")
        print(f"Status Code (with filter): {response.status_code}")
        print(f"Response (with filter, first 2 items): {json.dumps(response.json()[:2], indent=2) if response.json() else '[]'}")
        
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        
        print("✅ GET /api/payments/transactions endpoint test passed!")
        return True
    except Exception as e:
        print(f"❌ GET /api/payments/transactions endpoint test failed: {str(e)}")
        return False

def test_invalid_package():
    """Test validation for invalid package IDs"""
    print("\n🔍 Testing invalid package ID validation...")
    try:
        # Test invalid menu package
        checkout_data = {
            "package_id": "invalid_package",
            "origin_url": BACKEND_URL,
            "customer_email": "test@example.com",
            "customer_name": "Test User"
        }
        
        response = requests.post(f"{BASE_URL}/payments/menu/checkout", json=checkout_data)
        print(f"Menu Status Code: {response.status_code}")
        print(f"Menu Response: {response.json()}")
        
        assert response.status_code == 400
        assert "detail" in response.json()
        
        # Test invalid event package
        event_data = {
            "package_id": "invalid_package",
            "origin_url": BACKEND_URL,
            "payment_type": "deposit",
            "guests": 10,
            "event_date": "2024-12-31",
            "customer_email": "event@example.com",
            "customer_name": "Event Organizer"
        }
        
        response = requests.post(f"{BASE_URL}/payments/event/checkout", json=event_data)
        print(f"Event Status Code: {response.status_code}")
        print(f"Event Response: {response.json()}")
        
        assert response.status_code == 400
        assert "detail" in response.json()
        
        print("✅ Invalid package ID validation test passed!")
        return True
    except Exception as e:
        print(f"❌ Invalid package ID validation test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall status"""
    print("=" * 80)
    print("🧪 STARTING BACKEND API TESTS FOR LE CLUB RESTAURANT PAYMENT SYSTEM")
    print("=" * 80)
    
    # Track test results
    results = {}
    
    # Test existing endpoints
    results["root_endpoint"] = test_root_endpoint()
    results["create_status"], status_id = test_create_status_check()
    results["get_status_checks"] = test_get_status_checks()
    
    # Test new payment endpoints
    results["get_packages"] = test_get_packages()
    results["menu_checkout"], menu_session_id = test_menu_checkout()
    results["event_checkout"], event_session_id = test_event_checkout()
    
    if menu_session_id:
        results["payment_status"] = test_payment_status(menu_session_id)
    else:
        results["payment_status"] = False
        print("❌ Skipping payment status test due to failed checkout test")
    
    results["transactions"] = test_transactions()
    results["invalid_package"] = test_invalid_package()
    
    # Print summary
    print("\n" + "=" * 80)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 80)
    
    all_passed = True
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        if not passed:
            all_passed = False
        print(f"{test_name}: {status}")
    
    print("\n" + "=" * 80)
    overall = "✅ ALL TESTS PASSED" if all_passed else "❌ SOME TESTS FAILED"
    print(f"OVERALL STATUS: {overall}")
    print("=" * 80)
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)