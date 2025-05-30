import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center mr-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-amber-600 to-red-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className={`font-bold text-xl lg:text-2xl ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                Le Restaurant
              </h1>
              <p className={`text-sm font-medium ${isScrolled ? 'text-amber-600' : 'text-amber-200'}`}>
                Le Club
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Accueil', id: 'hero' },
              { label: 'À Propos', id: 'about' },
              { label: 'Menu', id: 'menu' },
              { label: 'Galerie', id: 'gallery' },
              { label: 'Événements', id: 'events' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-amber-600' 
                    : 'text-white hover:text-amber-200'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4"
          >
            {[
              { label: 'Accueil', id: 'hero' },
              { label: 'À Propos', id: 'about' },
              { label: 'Menu', id: 'menu' },
              { label: 'Galerie', id: 'gallery' },
              { label: 'Événements', id: 'events' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-3 px-2 text-gray-700 hover:text-amber-600 font-medium"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;