import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1517314626714-ac1b9a16515e",
      alt: "Tajine traditionnel marocain",
      category: "Plats"
    },
    {
      src: "https://images.pexels.com/photos/1618929/pexels-photo-1618929.jpeg",
      alt: "Couscous royal aux légumes",
      category: "Plats"
    },
    {
      src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
      alt: "Pastilla aux amandes",
      category: "Entrées"
    },
    {
      src: "https://images.unsplash.com/photo-1591299089616-c9604047b1a6",
      alt: "Thé à la menthe traditionnel",
      category: "Boissons"
    },
    {
      src: "https://i.postimg.cc/SN98Gg82/469967523-122126728664530331-1408175679896011830-n.jpg",
      alt: "Restaurant Le Club - Ambiance authentique marocaine",
      category: "Ambiance"
    },
    {
      src: "https://images.unsplash.com/photo-1567708417032-bef40ae8cea1",
      alt: "Service du thé à la menthe",
      category: "Boissons"
    },
    {
      src: "https://images.pexels.com/photos/9143471/pexels-photo-9143471.jpeg",
      alt: "Intérieur élégant du restaurant",
      category: "Ambiance"
    },
    {
      src: "https://images.unsplash.com/photo-1517227180537-db47cb70685e",
      alt: "Café marocain authentique",
      category: "Ambiance"
    }
  ];

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Galerie
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Un Voyage <span className="text-amber-600">Visuel</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plongez dans l'univers du Restaurant Le Club à travers nos créations culinaires et notre ambiance raffinée.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ZoomIn className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Envie de vivre cette expérience ? Réservez votre table dès maintenant.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
          >
            Réserver une Table
          </motion.button>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {selectedImage.alt}
                </h3>
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedImage.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;