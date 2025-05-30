import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Calendar, Star, Phone, Mail } from 'lucide-react';

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Event inquiry submitted:', formData);
    alert('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.');
  };

  const eventTypes = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mariages Traditionnels",
      description: "Célébrez votre union avec l'élégance et les traditions marocaines. Menu personnalisé, décoration authentique.",
      features: ["Décoration traditionnelle", "Menu sur mesure", "Service personnalisé", "Musique andalouse"],
      image: "https://images.pexels.com/photos/14547414/pexels-photo-14547414.jpeg"
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
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
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
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {event.title}
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
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-lg'
                      : 'border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
                  }`}
                >
                  Choisir cette formule
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
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
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Envoyer ma Demande
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
                    Experience de 20+ ans en événementiel
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
    </section>
  );
};

export default Events;