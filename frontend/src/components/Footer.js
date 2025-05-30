import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Star } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerSections = {
    navigation: [
      { label: 'Accueil', id: 'hero' },
      { label: 'À Propos', id: 'about' },
      { label: 'Menu', id: 'menu' },
      { label: 'Galerie', id: 'gallery' },
      { label: 'Événements', id: 'events' },
      { label: 'Contact', id: 'contact' }
    ],
    services: [
      { label: 'Dîner sur place', href: '#menu' },
      { label: 'Mariages', href: '#events' },
      { label: 'Événements privés', href: '#events' },
      { label: 'Événements corporatifs', href: '#events' },
      { label: 'Réservations groupes', href: '#contact' }
    ],
    specialites: [
      { label: 'Tajines traditionnels', href: '#menu' },
      { label: 'Couscous royal', href: '#menu' },
      { label: 'Pastillas maison', href: '#menu' },
      { label: 'Thé à la menthe', href: '#menu' },
      { label: 'Pâtisseries orientales', href: '#menu' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Pre-footer CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-amber-600 to-red-600 py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Prêt pour une Expérience Authentique ?
          </h3>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant votre table et laissez-vous transporter par les saveurs du Maroc 
            dans l'ambiance raffinée du Restaurant Le Club.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Réserver une Table
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('menu')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300"
            >
              Voir le Menu
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <div className="flex items-center mb-6">
                {/* Moroccan-inspired logo */}
                <div className="relative w-12 h-12 mr-3">
                  {/* Outer decorative ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-red-600 rounded-full"></div>
                  
                  {/* Inner white circle */}
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                    {/* Moroccan 8-pointed star */}
                    <div className="relative w-6 h-6">
                      {/* Main star shape using CSS */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-red-600 transform rotate-0" 
                           style={{
                             clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                           }}>
                      </div>
                      
                      {/* Decorative center dot */}
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-amber-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                  
                  {/* Small decorative elements around the logo */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full opacity-80"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-400 rounded-full opacity-80"></div>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl text-white font-display">Le Restaurant</h3>
                  <p className="text-amber-400 font-medium italic">Le Club</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Découvrez l'art culinaire marocain authentique dans une ambiance élégante et raffinée. 
                Une expérience gastronomique unique au cœur de Lattes.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">41 Rue de Rondelet, 34970 Lattes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">06 66 53 30 99</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">restaurant.traiteur.leclub@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Lun-Ven: 12h-14h30</span>
                </div>
                <div className="flex items-center text-gray-300 ml-7">
                  <span className="text-sm">Sam: 24h/24 • Dim: Fermé</span>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg text-white mb-6">Navigation</h4>
              <ul className="space-y-3">
                {footerSections.navigation.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg text-white mb-6">Nos Services</h4>
              <ul className="space-y-3">
                {footerSections.services.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg text-white mb-6">Nos Spécialités</h4>
              <ul className="space-y-3 mb-6">
                {footerSections.specialites.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div>
                <h5 className="font-semibold text-white mb-4">Suivez-nous</h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gradient-to-r from-amber-600 to-red-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Awards and Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-sm text-gray-300">Cuisine Authentique</p>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="w-8 h-8 text-red-400 mb-2" />
                <p className="text-sm text-gray-300">Service du Cœur</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
                <p className="text-sm text-gray-300">Certifié Halal</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mt-2">4.9/5 Étoiles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © 2024 Le Restaurant Le Club. Tous droits réservés. | 
              <span className="ml-2">Fait avec <Heart className="w-4 h-4 text-red-400 inline mx-1" /> pour la tradition marocaine.</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-6 text-sm"
            >
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                CGU
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;