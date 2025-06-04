import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css';
import HomePage from './pages/HomePage';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;