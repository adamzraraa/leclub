import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star } from 'lucide-react';

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/29125651/pexels-photo-29125651.jpeg')`
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Moroccan Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/12494923/pexels-photo-12494923.jpeg')`,
            backgroundSize: '200px 200px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="text-amber-400 w-12 h-12 mr-3" />
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-amber-400 w-6 h-6 fill-current" />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Le Restaurant
          <span className="block text-amber-400 font-light italic">Le Club</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-xl sm:text-2xl text-amber-100 mb-4 font-light">
            L'Art Culinaire Marocain Authentique
          </p>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Découvrez les saveurs traditionnelles du Maroc dans une ambiance élégante et raffinée. 
            Chaque plat raconte une histoire, chaque épice évoque un voyage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToMenu}
            className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 w-full sm:w-auto"
          >
            Découvrir Notre Menu
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
          >
            Événements Privés
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;