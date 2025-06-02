import { loadStripe } from '@stripe/stripe-js';

// Configuration Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export class PaymentService {
  
  // Récupérer les packages disponibles
  static async getPackages() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/packages`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des packages');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur packages:', error);
      throw error;
    }
  }

  // Créer une session de paiement pour une commande menu
  static async createMenuCheckout({ packageId, customerEmail, customerName }) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/menu/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_id: packageId,
          origin_url: window.location.origin,
          customer_email: customerEmail,
          customer_name: customerName
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du paiement');
      }

      const { checkout_url } = await response.json();
      
      // Rediriger vers Stripe Checkout
      window.location.href = checkout_url;
      
    } catch (error) {
      console.error('Erreur paiement menu:', error);
      throw error;
    }
  }

  // Créer une session de paiement pour un événement
  static async createEventCheckout({ 
    packageId, 
    paymentType = 'deposit', 
    guests, 
    eventDate, 
    customerEmail, 
    customerName, 
    eventDetails 
  }) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/event/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_id: packageId,
          origin_url: window.location.origin,
          payment_type: paymentType,
          guests: parseInt(guests),
          event_date: eventDate,
          customer_email: customerEmail,
          customer_name: customerName,
          event_details: eventDetails
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du paiement événement');
      }

      const { checkout_url, amount, description } = await response.json();
      
      // Rediriger vers Stripe Checkout
      window.location.href = checkout_url;
      
    } catch (error) {
      console.error('Erreur paiement événement:', error);
      throw error;
    }
  }

  // Vérifier le statut d'un paiement
  static async checkPaymentStatus(sessionId) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/status/${sessionId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la vérification du paiement');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur statut paiement:', error);
      throw error;
    }
  }

  // Récupérer l'historique des transactions
  static async getTransactions(customerEmail = null) {
    try {
      const url = customerEmail 
        ? `${BACKEND_URL}/api/payments/transactions?customer_email=${encodeURIComponent(customerEmail)}`
        : `${BACKEND_URL}/api/payments/transactions`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des transactions');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur transactions:', error);
      throw error;
    }
  }

  // Calculer le montant pour un événement
  static calculateEventAmount(packagePrice, guests, isDeposit = true) {
    const totalAmount = packagePrice * guests;
    if (isDeposit) {
      return {
        depositAmount: totalAmount * 0.30,
        totalAmount,
        remainingAmount: totalAmount * 0.70
      };
    }
    return {
      totalAmount,
      depositAmount: 0,
      remainingAmount: 0
    };
  }

  // Formater le montant pour l'affichage
  static formatAmount(amount, currency = 'EUR') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  // Valider les données de paiement
  static validatePaymentData(data, type = 'menu') {
    const errors = [];

    if (!data.customerEmail || !data.customerEmail.includes('@')) {
      errors.push('Email client requis et valide');
    }

    if (!data.customerName || data.customerName.trim().length < 2) {
      errors.push('Nom client requis (minimum 2 caractères)');
    }

    if (!data.packageId) {
      errors.push('Package requis');
    }

    if (type === 'event') {
      if (!data.guests || data.guests < 1) {
        errors.push('Nombre d\'invités requis (minimum 1)');
      }

      if (!data.eventDate) {
        errors.push('Date d\'événement requise');
      } else {
        const eventDate = new Date(data.eventDate);
        const today = new Date();
        if (eventDate <= today) {
          errors.push('La date d\'événement doit être dans le futur');
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default PaymentService;