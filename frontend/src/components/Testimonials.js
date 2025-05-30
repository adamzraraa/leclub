import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Cliente fidèle",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Une expérience culinaire extraordinaire ! Chaque plat est un voyage au Maroc. L'ambiance est magique et le service impeccable. Je recommande vivement le tajine d'agneau aux pruneaux.",
      date: "Il y a 2 semaines"
    },
    {
      name: "Ahmed Benali",
      role: "Critique gastronomique",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Le Restaurant Le Club offre l'authenticité marocaine la plus pure que j'aie goûtée en France. Les épices sont parfaitement dosées et l'hospitalité est remarquable. Un incontournable !",
      date: "Il y a 1 mois"
    },
    {
      name: "Marie Dubois",
      role: "Organisatrice d'événements",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Nous avons organisé notre mariage ici et c'était parfait ! L'équipe a été exceptionnelle, la décoration somptueuse et le menu délicieux. Nos invités en parlent encore.",
      date: "Il y a 3 mois"
    },
    {
      name: "Jean-Pierre Rousseau",
      role: "Chef d'entreprise",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Pour nos dîners d'affaires, c'est notre adresse de référence. L'atmosphère est parfaite pour les négociations et la cuisine toujours excellente. Bravo à toute l'équipe !",
      date: "Il y a 2 mois"
    },
    {
      name: "Fatima Alaoui",
      role: "Amatrice de cuisine marocaine",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "En tant que Marocaine, je suis très exigeante sur l'authenticité. Ici, je retrouve les saveurs de mon enfance. Le couscous royal est absolument divin et le thé à la menthe parfait.",
      date: "Il y a 1 semaine"
    },
    {
      name: "Lucas Moreau",
      role: "Blogueur culinaire",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Un voyage sensoriel extraordinaire ! La pastilla est un chef-d'œuvre et l'ambiance nous transporte directement à Marrakech. Service attentionné et prix justes. À découvrir absolument !",
      date: "Il y a 3 semaines"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-amber-50">
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
            Témoignages
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Ce que disent nos <span className="text-amber-600">Clients</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences exceptionnelles vécues par nos clients au Restaurant Le Club. 
            Leur satisfaction fait notre fierté.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {[
            { number: "4.9", label: "Note Moyenne", suffix: "/5" },
            { number: "100+", label: "Avis Clients", suffix: "" },
            { number: "98%", label: "Satisfaction", suffix: "" },
            { number: "50+", label: "Événements/An", suffix: "" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold text-amber-600 mb-2"
              >
                {stat.number}{stat.suffix}
              </motion.div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-6 text-amber-600/20">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-amber-600 mt-1">{testimonial.date}</p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-red-600 rounded-b-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-600 to-red-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Rejoignez nos Clients Satisfaits
            </h3>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Venez découvrir pourquoi tant de personnes nous font confiance pour leurs moments les plus précieux. 
              Réservez dès maintenant votre expérience authentique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Réserver une Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300"
              >
                Organiser un Événement
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center text-gray-600">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-medium">Certifié Halal</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-medium">Cuisine Traditionnelle</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-medium">Service Premium</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="font-medium">Événements Sur-Mesure</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;