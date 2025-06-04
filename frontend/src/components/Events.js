import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Calendar, Star, Phone, Mail, CheckCircle, AlertCircle, Loader, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { sendQuoteByEmail, createWhatsAppFallback } from '../services/emailService';
import PaymentButton from './PaymentButton';

const Events = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Galerie de photos de mariages traditionnels réels
  const mariagePhotos = [
    {
      src: "https://i.postimg.cc/LsXSB07j/Capture-d-e-cran-2025-05-30-a-12-46-13.png", // Photo 1 : Caftan doré
      alt: "Mariage traditionnel marocain - Caftan doré avec couronne",
      description: "Tenue traditionnelle dorée avec broderies artisanales et couronne royale"
    },
    {
      src: "https://i.postimg.cc/tJG8frrS/Capture-d-e-cran-2025-05-30-a-12-46-08.png", // Photo 2 : Caftan blanc
      alt: "Mariage traditionnel marocain - Caftan blanc avec couronne",
      description: "Élégant caftan blanc avec couronne royale et broderies précieuses"
    },
    {
      src: "https://i.postimg.cc/HxXhQwpQ/Capture-d-e-cran-2025-05-30-a-12-46-01.png", // Photo 3 : Caftan bleu clair
      alt: "Mariage traditionnel marocain - Caftan bleu clair avec couronne",
      description: "Magnifique caftan bleu clair avec couronne traditionnelle et finitions délicates"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fonction pour gérer la sélection d'une formule
  const handleSelectPackage = (pkg) => {
    // Pré-remplir le formulaire avec la formule choisie
    const packageDetails = `Je souhaite un devis pour la formule "${pkg.name}" à ${pkg.price}.

Services inclus :
${pkg.features.map(feature => `• ${feature}`).join('\n')}

Merci de me contacter pour finaliser mon événement.`;

    setFormData(prev => ({
      ...prev,
      eventType: pkg.name,
      message: packageDetails
    }));

    // Faire défiler vers le formulaire de devis
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Afficher un message de confirmation
    setSubmitStatus({
      type: 'info',
      message: `✨ Formule "${pkg.name}" sélectionnée ! Complétez vos informations ci-dessous pour recevoir votre devis.`
    });

    // Effacer le message après quelques secondes
    setTimeout(() => {
      setSubmitStatus({ type: '', message: '' });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Étape 1: Essayer d'envoyer par email d'abord
      setSubmitStatus({ 
        type: 'info', 
        message: '📧 Envoi du devis par email en cours...' 
      });

      const emailResult = await sendQuoteByEmail(formData);
      
      if (emailResult.success) {
        // Email process réussi
        if (emailResult.method === 'mailto') {
          setSubmitStatus({ 
            type: 'success', 
            message: '📧 Votre client email s\'est ouvert avec la demande de devis pré-remplie ! Cliquez sur "Envoyer" pour finaliser l\'envoi vers le restaurant.' 
          });
        } else {
          setSubmitStatus({ 
            type: 'success', 
            message: '✅ Votre demande de devis a été envoyée par email ! Nous vous contacterons rapidement.' 
          });
        }
        
        // Reset du formulaire après succès
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            eventType: '',
            date: '',
            guests: '',
            message: ''
          });
          setSubmitStatus({ type: '', message: '' });
        }, 4000);
        
      } else {
        // Si l'email échoue complètement, utiliser WhatsApp comme fallback
        console.warn('Toutes les méthodes email ont échoué, utilisation de WhatsApp');
        
        setSubmitStatus({ 
          type: 'info', 
          message: '📧 Email indisponible, redirection vers WhatsApp...' 
        });
        
        // Attendre un peu avant de rediriger
        setTimeout(() => {
          const whatsappUrl = createWhatsAppFallback(formData);
          window.open(whatsappUrl, '_blank');
          
          setSubmitStatus({ 
            type: 'success', 
            message: '📱 Votre demande a été envoyée sur WhatsApp ! Nous vous contacterons rapidement.' 
          });
          
          // Reset du formulaire
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              eventType: '',
              date: '',
              guests: '',
              message: ''
            });
            setSubmitStatus({ type: '', message: '' });
          }, 3000);
        }, 1500);
      }
      
    } catch (error) {
      console.error('Erreur dans handleSubmit:', error);
      
      // En cas d'erreur complète, utiliser WhatsApp comme fallback ultime
      setSubmitStatus({ 
        type: 'info', 
        message: '🔄 Redirection vers WhatsApp...' 
      });
      
      setTimeout(() => {
        const whatsappUrl = createWhatsAppFallback(formData);
        window.open(whatsappUrl, '_blank');
        
        setSubmitStatus({ 
          type: 'success', 
          message: '📱 Votre demande a été envoyée sur WhatsApp ! Nous vous contacterons rapidement.' 
        });
        
        // Reset du formulaire
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            eventType: '',
            date: '',
            guests: '',
            message: ''
          });
          setSubmitStatus({ type: '', message: '' });
        }, 3000);
      }, 1000);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonctions pour la galerie de mariages
  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mariagePhotos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mariagePhotos.length) % mariagePhotos.length);
  };

  const eventTypes = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mariages Traditionnels",
      description: "Célébrez votre union avec l'élégance et les traditions marocaines. Menu personnalisé, décoration authentique.",
      features: ["Décoration traditionnelle", "Menu sur mesure", "Service personnalisé", "Musique andalouse"],
      image: "https://images.pexels.com/photos/14547414/pexels-photo-14547414.jpeg",
      clickable: true, // Nouvelle propriété pour indiquer que c'est cliquable
      galleryAction: () => openGallery(0) // Action à exécuter au clic
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Événements Privés",
      description: "Anniversaires, fiançailles, réunions familiales dans une ambiance chaleureuse et raffinée.",
      features: ["Espace privatisé", "Service dédié", "Arrangements floraux", "Animations possibles"],
      image: "https://images.unsplash.com/photo-1628959831469-59c2b87b7c57"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Événements Corporatifs",
      description: "Réceptions d'entreprise, séminaires et dîners d'affaires dans un cadre exceptionnel.",
      features: ["Équipement audiovisuel", "Menu business", "Service discret", "Parking disponible"],
      image: "https://images.pexels.com/photos/6634469/pexels-photo-6634469.jpeg"
    }
  ];

  const eventPackages = [
    {
      name: "Package Essentiel",
      price: "45€/personne",
      features: [
        "Menu 3 services",
        "Décoration de base",
        "Service standard",
        "Thé à la menthe inclus"
      ]
    },
    {
      name: "Package Premium",
      price: "65€/personne", 
      features: [
        "Menu 5 services",
        "Décoration raffinée",
        "Service personnalisé",
        "Boissons incluses",
        "Animations traditionnelles"
      ],
      popular: true
    },
    {
      name: "Package Royal",
      price: "95€/personne",
      features: [
        "Menu gastronomique",
        "Décoration luxueuse",
        "Service de conciergerie",
        "Bar ouvert",
        "Spectacle andalou",
        "Photographe inclus"
      ]
    }
  ];

  return (
    <section id="events" className="py-16 lg:py-24 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Événements Privés
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Mariages & <span className="text-amber-600">Célébrations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transformez vos moments les plus précieux en souvenirs inoubliables dans l'ambiance authentique 
            et raffinée du Restaurant Le Club. Nous créons des expériences sur mesure pour chaque occasion spéciale.
          </p>
        </motion.div>

        {/* Event Types */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {eventTypes.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={event.clickable ? event.galleryAction : undefined}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                event.clickable ? 'cursor-pointer' : ''
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4 text-amber-400">
                  {event.icon}
                </div>
                {/* Indicateur cliquable pour les mariages */}
                {event.clickable && (
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-90">
                    Voir Photos Réelles
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {event.title}
                  {event.clickable && <span className="text-amber-600 ml-2">📸</span>}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <ul className="space-y-2">
                  {event.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {event.clickable && (
                  <div className="mt-4 text-center">
                    <span className="text-amber-600 font-semibold text-sm">
                      👆 Cliquez pour voir nos vrais mariages traditionnels
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nos <span className="text-amber-600">Formules</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {eventPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 ${
                  pkg.popular ? 'ring-2 ring-amber-600 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Plus Populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h4>
                  <div className="text-3xl font-bold text-amber-600">{pkg.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-lg'
                        : 'border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
                    }`}
                  >
                    📋 Choisir cette formule
                  </motion.button>
                  
                  <PaymentButton
                    type="event"
                    packageId={pkg.id}
                    packageInfo={{
                      name: pkg.name,
                      price: pkg.price
                    }}
                    paymentType="deposit"
                    guests={20} // Valeur par défaut, sera modifiée dans le formulaire
                    eventDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Dans 30 jours par défaut
                    className="w-full py-3 rounded-full font-semibold"
                  >
                    💳 Réserver avec acompte 30%
                  </PaymentButton>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          id="quote-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Demande de <span className="text-amber-600">Devis</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Type d'événement</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Sélectionner</option>
                      <option value="mariage">Mariage</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="fiancailles">Fiançailles</option>
                      <option value="corporate">Événement corporatif</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Date souhaitée</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nombre d'invités</label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      min="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="Nombre d'invités"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="Décrivez votre événement, vos souhaits particuliers..."
                  ></textarea>
                </div>
                
                {/* Status Message */}
                {submitStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-center ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : submitStatus.type === 'error'
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {submitStatus.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
                    {submitStatus.type === 'error' && <AlertCircle className="w-5 h-5 mr-2" />}
                    {submitStatus.type === 'info' && <Mail className="w-5 h-5 mr-2" />}
                    <span className="text-sm">{submitStatus.message}</span>
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-600 to-red-600 text-white hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer ma Demande'
                  )}
                </motion.button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="lg:pl-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Parlons de votre <span className="text-amber-600">Projet</span>
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">Téléphone</p>
                    <p className="text-gray-600">06 66 53 30 99</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">restaurant.traiteur.leclub@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">Délai de réservation</p>
                    <p className="text-gray-600">Minimum 2 semaines à l'avance</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-3">Pourquoi nous choisir ?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    Experience de 5+ ans en événementiel
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    Équipe dédiée aux événements privés
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    Menus personnalisables selon vos goûts
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-2" />
                    Décoration authentique marocaine
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Galerie Modale pour Mariages Traditionnels */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton Fermer */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Navigation précédent */}
              {mariagePhotos.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              
              {/* Navigation suivant */}
              {mariagePhotos.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
              
              {/* Image principale */}
              <div className="relative">
                <img
                  src={mariagePhotos[currentImageIndex].src}
                  alt={mariagePhotos[currentImageIndex].alt}
                  className="w-full h-[70vh] object-cover"
                />
                
                {/* Informations de l'image */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Mariage Traditionnel Marocain
                  </h3>
                  <p className="text-amber-200 text-sm mb-2">
                    {mariagePhotos[currentImageIndex].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Photo {currentImageIndex + 1} sur {mariagePhotos.length}
                    </span>
                    <span className="text-amber-200 text-sm">
                      Événements réalisés par Restaurant Le Club
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Miniatures */}
              {mariagePhotos.length > 1 && (
                <div className="bg-gray-100 p-4">
                  <div className="flex justify-center space-x-3">
                    {mariagePhotos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-amber-600 scale-110' 
                            : 'border-gray-300 hover:border-amber-400'
                        }`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;