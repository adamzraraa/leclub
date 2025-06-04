import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, User, Clock, Send } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import PaymentButton from './PaymentButton';
import PaymentService from '../services/paymentService';

const Cart = () => {
  const { 
    items, 
    isOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    toggleCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    time: ''
  });

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmOrder = () => {
    if (!orderDetails.name || !orderDetails.time) {
      alert('Veuillez remplir votre nom et l\'heure de réservation');
      return;
    }

    // Créer un message WhatsApp détaillé avec la commande
    const itemsList = items.map(item => 
      `${item.quantity}x ${item.name} (${item.price})`
    ).join('\n');
    
    const total = getTotalPrice().toFixed(2);
    const message = `🍽️ NOUVELLE COMMANDE - Restaurant Le Club

👤 Nom: ${orderDetails.name}
🕐 Heure: ${orderDetails.time}

📋 COMMANDE:
${itemsList}

💰 TOTAL: ${total}€

📍 Service sur place
41 Rue de Rondelet, 34970 Lattes

Merci de confirmer la disponibilité.`;
    
    // Format international correct pour WhatsApp
    const whatsappUrl = `https://wa.me/33666533099?text=${encodeURIComponent(message)}`;
    console.log('WhatsApp URL:', whatsappUrl);
    
    // Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Nettoyer immédiatement après avoir tenté d'ouvrir WhatsApp
    alert('Commande envoyée vers WhatsApp ! Vérifiez que l\'application s\'est ouverte.');
    clearCart();
    setShowCheckoutForm(false);
    setOrderDetails({ name: '', time: '' });
    toggleCart();
  };

  const handleCopyMessage = () => {
    const itemsList = items.map(item => 
      `${item.quantity}x ${item.name} (${item.price})`
    ).join('\n');
    
    const total = getTotalPrice().toFixed(2);
    const message = `🍽️ NOUVELLE COMMANDE - Restaurant Le Club

👤 Nom: ${orderDetails.name}
🕐 Heure: ${orderDetails.time}

📋 COMMANDE:
${itemsList}

💰 TOTAL: ${total}€

📍 Service sur place
41 Rue de Rondelet, 34970 Lattes

Merci de confirmer la disponibilité.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).then(() => {
        alert('Message copié ! Collez-le dans WhatsApp au 06 66 53 30 99');
        clearCart();
        setShowCheckoutForm(false);
        setOrderDetails({ name: '', time: '' });
        toggleCart();
      });
    } else {
      alert(`Copiez ce message et envoyez-le au 06 66 53 30 99 :\n\n${message}`);
    }
  };

  const handleShowCheckoutForm = () => {
    setShowCheckoutForm(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleCart}
          />
          
          {/* Panier */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header du panier */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <ShoppingBag className="w-6 h-6 text-amber-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">
                  Mon Panier ({getTotalItems()})
                </h3>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Contenu du panier */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Votre panier est vide</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Ajoutez des plats depuis notre menu
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Image du plat */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        {/* Détails du plat */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.category}
                          </p>
                          <p className="text-amber-600 font-bold mt-1">
                            {item.price}
                          </p>
                        </div>

                        {/* Bouton supprimer */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>

                      {/* Contrôles de quantité */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          
                          <span className="font-semibold text-gray-800 w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Sous-total */}
                        <p className="font-bold text-gray-800">
                          {(parseFloat(item.price.replace('€', '').replace(',', '.')) * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer du panier */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-amber-600">
                    {getTotalPrice().toFixed(2)}€
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  {showCheckoutForm ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            value={orderDetails.name}
                            onChange={handleInputChange}
                            placeholder="Votre nom"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <input
                            type="time"
                            name="time"
                            value={orderDetails.time}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      {/* Checkout Button - Paiement sécurisé */}
                      <div>
                        <PaymentButton
                          type="menu"
                          packageId="menu_complet"
                          packageInfo={{
                            name: `Commande Le Club (${items.length} article${items.length > 1 ? 's' : ''})`,
                            price: getTotalPrice(),
                            description: `Commande contenant: ${items.map(item => item.name).join(', ')}`
                          }}
                          customerInfo={orderDetails}
                          className="w-full py-4 px-6 rounded-xl text-lg font-semibold"
                          onPaymentStart={() => {
                            console.log('Démarrage du paiement pour commande cart');
                          }}
                          onPaymentError={(error) => {
                            alert(`Erreur de paiement: ${error}`);
                          }}
                        >
                          💳 Payer ma commande {PaymentService.formatAmount(getTotalPrice())}
                        </PaymentButton>
                        
                        {/* Bouton WhatsApp alternatif */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleShowCheckoutForm}
                          className="w-full mt-3 py-3 px-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                        >
                          <span>📱</span>
                          Ou commander sur WhatsApp
                        </motion.button>
                      </div>
                      
                      <button
                        onClick={handleCopyMessage}
                        className="w-full border-2 border-amber-600 text-amber-600 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors duration-200 text-sm"
                      >
                        📋 Copier le message (si WhatsApp ne marche pas)
                      </button>
                    </div>
                  ) : (
                    {/* Checkout Button - Paiement sécurisé */}
                    <div>
                      <PaymentButton
                        type="menu"
                        packageId="menu_complet" // Package global pour commandes cart
                        packageInfo={{
                          name: `Commande Le Club (${items.length} article${items.length > 1 ? 's' : ''})`,
                          price: getTotalPrice(),
                          description: `Commande contenant: ${items.map(item => item.name).join(', ')}`
                        }}
                        customerInfo={orderDetails}
                        className="w-full py-4 px-6 rounded-xl text-lg font-semibold"
                        onPaymentStart={() => {
                          console.log('Démarrage du paiement pour commande cart');
                        }}
                        onPaymentError={(error) => {
                          alert(`Erreur de paiement: ${error}`);
                        }}
                      >
                        💳 Payer ma commande {PaymentService.formatAmount(getTotalPrice())}
                      </PaymentButton>
                      
                      {/* Bouton WhatsApp alternatif */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShowCheckoutForm}
                        className="w-full mt-3 py-3 px-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                      >
                        <span>📱</span>
                        Ou commander sur WhatsApp
                      </motion.button>
                    </div>
                  )}
                  
                  <button
                    onClick={clearCart}
                    className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Vider le panier
                  </button>
                </div>

                {/* Info livraison */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>🏪 Service sur place uniquement</p>
                  <p>📍 41 Rue de Rondelet, 34970 Lattes</p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;