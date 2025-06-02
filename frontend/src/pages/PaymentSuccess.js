import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentService from '../services/paymentService';

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Récupérer session_id depuis l'URL
        const urlParams = new URLSearchParams(location.search);
        const sessionId = urlParams.get('session_id');
        
        if (!sessionId) {
          setError('Aucune session de paiement trouvée');
          return;
        }

        // Vérifier le statut du paiement
        const status = await PaymentService.checkPaymentStatus(sessionId);
        setPaymentStatus(status);
        
      } catch (err) {
        console.error('Erreur vérification paiement:', err);
        setError('Erreur lors de la vérification du paiement');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [location]);

  const getPaymentTypeInfo = () => {
    if (!paymentStatus?.metadata) return {};
    
    const metadata = paymentStatus.metadata;
    const isEvent = metadata.payment_type?.includes('event');
    const isDeposit = metadata.is_deposit === 'true';
    
    return {
      isEvent,
      isDeposit,
      packageName: metadata.package_name || 'Package',
      customerName: metadata.customer_name || '',
      guests: metadata.guests || '',
      eventDate: metadata.event_date || ''
    };
  };

  const formatAmount = (amount, currency = 'eur') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // Stripe amounts are in cents
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Vérification du paiement...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/menu')}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retour au menu
          </button>
        </motion.div>
      </div>
    );
  }

  const paymentInfo = getPaymentTypeInfo();
  const isPaid = paymentStatus?.payment_status === 'paid';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            {isPaid ? 'Paiement réussi !' : 'Paiement en cours...'}
          </h1>
          <p className="text-gray-600">
            {isPaid 
              ? 'Votre paiement a été traité avec succès' 
              : 'Nous vérifions votre paiement'
            }
          </p>
        </motion.div>

        {/* Payment Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-6 mb-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Détails du paiement</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Montant:</span>
              <span className="font-semibold">
                {formatAmount(paymentStatus?.amount_total || 0, paymentStatus?.currency)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-semibold">
                {paymentInfo.isEvent 
                  ? (paymentInfo.isDeposit ? 'Acompte événement' : 'Paiement événement complet')
                  : 'Commande menu'
                }
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Package:</span>
              <span className="font-semibold">{paymentInfo.packageName}</span>
            </div>

            {paymentInfo.isEvent && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Invités:</span>
                  <span className="font-semibold">{paymentInfo.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date événement:</span>
                  <span className="font-semibold">
                    {new Date(paymentInfo.eventDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Statut:</span>
              <span className={`font-semibold ${isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                {isPaid ? 'Payé' : 'En attente'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-lg p-6 mb-6"
        >
          <h3 className="font-semibold text-blue-800 mb-3">Prochaines étapes</h3>
          <div className="space-y-2 text-sm text-blue-700">
            {paymentInfo.isEvent ? (
              paymentInfo.isDeposit ? (
                <>
                  <p>✅ Votre acompte de 30% a été reçu</p>
                  <p>📧 Vous recevrez un email de confirmation</p>
                  <p>📞 Notre équipe vous contactera sous 24h pour finaliser les détails</p>
                  <p>💰 Le solde sera à régler avant l'événement</p>
                </>
              ) : (
                <>
                  <p>✅ Votre paiement complet a été reçu</p>
                  <p>📧 Vous recevrez un email de confirmation</p>
                  <p>📞 Notre équipe vous contactera pour finaliser l'organisation</p>
                </>
              )
            ) : (
              <>
                <p>✅ Votre commande a été reçue</p>
                <p>📧 Vous recevrez un email de confirmation</p>
                <p>📞 Nous vous contacterons pour organiser la livraison/retrait</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Retour au menu
          </button>
          <button
            onClick={() => navigate('/events')}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-lg hover:from-amber-700 hover:to-red-700 transition-all"
          >
            Voir nos événements
          </button>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p>Des questions ? Contactez-nous au 06 66 53 30 99</p>
          <p>ou par email : restaurant.traiteur.leclub@gmail.com</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;