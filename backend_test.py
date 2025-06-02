#!/usr/bin/env python3
import requests
import json
import sys
import time
from datetime import datetime

# Base URL from frontend .env file
BASE_URL = "https://a8a0bcd5-84dc-4f81-b57d-1f431d560fbc.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test the root endpoint"""
    print("\n🔍 Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert response.json() == {"message": "Hello World"}
        print("✅ Root endpoint test passed!")
        return True
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_create_status_check():
    """Test creating a status check"""
    print("\n🔍 Testing POST /api/status endpoint...")
    try:
        data = {"client_name": f"Test Client {datetime.now().isoformat()}"}
        response = requests.post(f"{BASE_URL}/status", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200
        assert "id" in response.json()
        assert response.json()["client_name"] == data["client_name"]
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
            assert "id" in response.json()[0]
            assert "client_name" in response.json()[0]
        print("✅ Get status checks test passed!")
        return True
    except Exception as e:
        print(f"❌ Get status checks test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall status"""
    print("=" * 50)
    print("🧪 STARTING BACKEND API TESTS")
    print("=" * 50)
    
    # Track test results
    results = {}
    
    # Test 1: Root endpoint
    results["root_endpoint"] = test_root_endpoint()
    
    # Test 2: Create status check
    results["create_status"], status_id = test_create_status_check()
    
    # Test 3: Get status checks
    results["get_status_checks"] = test_get_status_checks()
    
    # Print summary
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    
    all_passed = True
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        if not passed:
            all_passed = False
        print(f"{test_name}: {status}")
    
    print("\n" + "=" * 50)
    overall = "✅ ALL TESTS PASSED" if all_passed else "❌ SOME TESTS FAILED"
    print(f"OVERALL STATUS: {overall}")
    print("=" * 50)
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)