import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentService from '../services/paymentService';

const PaymentButton = ({ 
  type = 'menu', 
  packageId, 
  packageInfo,
  cartItems = [],
  paymentType = 'deposit',
  guests = 1,
  eventDate = '',
  eventDetails = '',
  customerInfo = {},
  children,
  className = '',
  disabled = false,
  onPaymentStart,
  onPaymentError 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    customerEmail: customerInfo.email || '',
    customerName: customerInfo.name || '',
    phone: customerInfo.phone || ''
  });

  const handlePaymentClick = () => {
    // Si on a déjà les infos client, lancer directement le paiement
    if (formData.customerEmail && formData.customerName) {
      initiatePayment();
    } else {
      // Sinon, afficher le formulaire
      setShowPaymentForm(true);
    }
  };

  const initiatePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Valider les données
      const validation = PaymentService.validatePaymentData({
        ...formData,
        packageId,
        guests,
        eventDate
      }, type);

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Callback de début de paiement
      if (onPaymentStart) {
        onPaymentStart();
      }

      // Créer la session de paiement selon le type
      if (type === 'menu') {
        await PaymentService.createMenuCheckout({
          packageId,
          customerEmail: formData.customerEmail,
          customerName: formData.customerName
        });
      } else if (type === 'event') {
        await PaymentService.createEventCheckout({
          packageId,
          paymentType,
          guests,
          eventDate,
          customerEmail: formData.customerEmail,
          customerName: formData.customerName,
          eventDetails
        });
      }

    } catch (error) {
      console.error('Erreur paiement:', error);
      if (onPaymentError) {
        onPaymentError(error.message);
      }
      setIsProcessing(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    initiatePayment();
  };

  const getButtonText = () => {
    if (isProcessing) return '🔄 Redirection...';
    
    if (type === 'menu') {
      const amount = packageInfo?.price || 0;
      return `💳 Payer ${PaymentService.formatAmount(amount)}`;
    } else if (type === 'event') {
      const amounts = PaymentService.calculateEventAmount(
        packageInfo?.price || 0, 
        guests, 
        paymentType === 'deposit'
      );
      const amount = paymentType === 'deposit' ? amounts.depositAmount : amounts.totalAmount;
      const text = paymentType === 'deposit' ? 'Acompte' : 'Paiement complet';
      return `💳 ${text} ${PaymentService.formatAmount(amount)}`;
    }
    
    return '💳 Payer maintenant';
  };

  if (showPaymentForm && !isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowPaymentForm(false);
          }
        }}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            💳 Informations de paiement
          </h3>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Votre nom complet"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="06 12 34 56 78"
              />
            </div>

            {/* Résumé de la commande */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Résumé</h4>
              {type === 'menu' ? (
                <div>
                  <p className="text-sm text-gray-600">{packageInfo?.name}</p>
                  <p className="font-bold text-lg text-amber-600">
                    {PaymentService.formatAmount(packageInfo?.price || 0)}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600">{packageInfo?.name}</p>
                  <p className="text-sm text-gray-600">{guests} invités</p>
                  {paymentType === 'deposit' ? (
                    <div>
                      <p className="text-sm text-gray-500">
                        Total: {PaymentService.formatAmount((packageInfo?.price || 0) * guests)}
                      </p>
                      <p className="font-bold text-lg text-amber-600">
                        Acompte 30%: {PaymentService.formatAmount((packageInfo?.price || 0) * guests * 0.30)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold text-lg text-amber-600">
                      Total: {PaymentService.formatAmount((packageInfo?.price || 0) * guests)}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!formData.customerEmail || !formData.customerName}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-lg hover:from-amber-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {getButtonText()}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handlePaymentClick}
      disabled={disabled || isProcessing}
      className={`
        relative overflow-hidden font-semibold transition-all duration-300 
        ${isProcessing 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
        }
        text-white shadow-lg hover:shadow-xl
        ${className}
      `}
    >
      {isProcessing && (
        <motion.div 
          className="absolute inset-0 bg-gray-600"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
      <span className="relative z-10">
        {children || getButtonText()}
      </span>
    </motion.button>
  );
};

export default PaymentButton;