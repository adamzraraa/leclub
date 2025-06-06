import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { sendContactMessage, createMailtoLink } from '../services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Créer un message WhatsApp pour le contact
    const message = `📞 NOUVEAU MESSAGE DE CONTACT - Restaurant Le Club

👤 INFORMATIONS CLIENT:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}
Sujet: ${formData.subject}

💬 MESSAGE:
${formData.message}

📍 Restaurant Le Club
41 Rue de Rondelet, 34970 Lattes

Merci de répondre au client.`;

    // Ouvrir WhatsApp avec le message
    const whatsappUrl = `https://wa.me/33666533099?text=${encodeURIComponent(message)}`;
    console.log('WhatsApp Contact URL:', whatsappUrl);
    
    try {
      // Ouvrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Afficher message de succès
      setSubmitStatus({ 
        type: 'success', 
        message: 'Votre message a été envoyé sur WhatsApp ! Nous vous répondrons rapidement.' 
      });
      
      // Reset du formulaire après 2 secondes
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setSubmitStatus({ type: '', message: '' });
      }, 2000);
      
    } catch (error) {
      // Fallback si problème
      setSubmitStatus({ 
        type: 'error', 
        message: 'Erreur lors de l\'ouverture de WhatsApp. Appelez directement le 06 66 53 30 99.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      details: ["06 66 53 30 99", "Réservations & Informations"],
      color: "text-amber-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["restaurant.traiteur.leclub@gmail.com", "Réponse sous 24h"],
      color: "text-red-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      details: ["41 Rue de Rondelet", "34970 Lattes, France"],
      color: "text-amber-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      details: ["Lun-Ven: 12h-14h30", "Sam: Ouvert 24h/24 • Dim: Fermé"],
      color: "text-red-600"
    }
  ];

  const quickLinks = [
    { icon: <Calendar className="w-5 h-5" />, text: "Réserver une table", action: "reservation" },
    { icon: <MessageCircle className="w-5 h-5" />, text: "Événements privés", action: "events" },
    { icon: <Phone className="w-5 h-5" />, text: "Commande à emporter", action: "takeaway" }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-amber-50 to-orange-50">
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
            Contact
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Restons en <span className="text-amber-600">Contact</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une question ? Une réservation ? Un événement à organiser ? 
            Notre équipe est à votre disposition pour vous accompagner.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Informations de <span className="text-amber-600">Contact</span>
            </h3>

            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-start"
                >
                  <div className={`${info.color} mr-4 mt-1`}>
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className={`${detailIndex === 0 ? 'text-gray-800 font-medium' : 'text-gray-600 text-sm'}`}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h4 className="font-bold text-gray-800 mb-4">Actions Rapides</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center p-3 text-left hover:bg-white rounded-lg transition-colors duration-200"
                  >
                    <span className="text-amber-600 mr-3">{link.icon}</span>
                    <span className="text-gray-700 font-medium">{link.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Carte Interactive</p>
                  <p className="text-sm text-gray-500">41 Rue de Rondelet, 34970 Lattes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Envoyez-nous un <span className="text-amber-600">Message</span>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Sujet</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Sélectionner un sujet</option>
                    <option value="reservation">Réservation</option>
                    <option value="event">Événement privé</option>
                    <option value="takeaway">Commande à emporter</option>
                    <option value="feedback">Commentaire</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="Votre message..."
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
                  'Envoyer le Message'
                )}
              </motion.button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-600 text-center">
                <strong className="text-amber-700">Temps de réponse :</strong> Nous répondons généralement sous 24h. 
                Pour les réservations urgentes, appelez-nous directement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;