import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Leaf, Coffee } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('brunch');

  const menuCategories = [
    { id: 'brunch', label: 'Brunch Oriental', icon: <Star className="w-5 h-5" /> },
    { id: 'entrees', label: 'Entrées', icon: <Leaf className="w-5 h-5" /> },
    { id: 'plats', label: 'Plats Principaux', icon: <Flame className="w-5 h-5" /> },
    { id: 'desserts', label: 'Desserts', icon: <Star className="w-5 h-5" /> },
    { id: 'boissons', label: 'Boissons', icon: <Star className="w-5 h-5" /> }
  ];

  const menuItems = {
    brunch: [
      {
        name: "Petit-Déjeuner Royal Marocain",
        description: "Assortiment de pâtisseries marocaines, msemen, miel, beurre, fromage et confiture d'orange",
        price: "22€",
        image: "https://images.pexels.com/photos/14017961/pexels-photo-14017961.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Crêpes Marocaines aux Amandes",
        description: "Crêpes traditionnelles garnies d'amandes effilées, miel et cannelle",
        price: "16€",
        image: "https://images.pexels.com/photos/32292781/pexels-photo-32292781.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Omelette aux Herbes Fraîches",
        description: "Omelette moelleuse aux herbes du jardin, tomates et olives marocaines",
        price: "14€",
        image: "https://images.pexels.com/photos/18077172/pexels-photo-18077172.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Tartines à l'Avocat et Dukkah",
        description: "Pain artisanal, avocat, mélange d'épices dukkah et huile d'argan",
        price: "13€",
        image: "https://images.unsplash.com/photo-1714628405052-8598f9fed4c7",
        spicy: false,
        popular: false
      },
      {
        name: "Shakshuka Marocaine",
        description: "Œufs pochés dans une sauce tomate épicée aux poivrons et coriandre",
        price: "18€",
        image: "https://images.pexels.com/photos/18160499/pexels-photo-18160499.jpeg",
        spicy: true,
        popular: true
      },
      {
        name: "Café des Épices + Pâtisseries",
        description: "Café parfumé à la cardamome servi avec une sélection de petites pâtisseries",
        price: "12€",
        image: "https://images.pexels.com/photos/8525684/pexels-photo-8525684.jpeg",
        spicy: false,
        popular: false
      }
    ],
    entrees: [
      {
        name: "Pastilla au Poulet",
        description: "Feuilleté traditionnel aux amandes, cannelle et poulet effiloché",
        price: "18€",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
        spicy: false,
        popular: true
      },
      {
        name: "Briouates aux Crevettes",
        description: "Délicieux feuilletés croustillants farcis aux crevettes et herbes fraîches",
        price: "16€",
        image: "https://images.unsplash.com/photo-1517314626714-ac1b9a16515e",
        spicy: false,
        popular: false
      },
      {
        name: "Salade Marocaine",
        description: "Mélange frais de tomates, concombres, olives et menthe",
        price: "12€",
        image: "https://images.pexels.com/photos/1618929/pexels-photo-1618929.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Harira Traditionnelle",
        description: "Soupe traditionnelle aux lentilles, tomates et épices",
        price: "10€",
        image: "https://images.unsplash.com/photo-1517314626714-ac1b9a16515e",
        spicy: true,
        popular: false
      }
    ],
    plats: [
      {
        name: "Tajine d'Agneau aux Pruneaux",
        description: "Agneau tendre mijoté aux pruneaux, amandes et épices traditionnelles",
        price: "28€",
        image: "https://images.unsplash.com/photo-1517314626714-ac1b9a16515e",
        spicy: false,
        popular: true
      },
      {
        name: "Couscous Royal",
        description: "Couscous aux sept légumes, agneau, poulet et merguez",
        price: "32€",
        image: "https://images.pexels.com/photos/1618929/pexels-photo-1618929.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Tajine de Poisson",
        description: "Poisson frais aux légumes et sauce chermoula",
        price: "26€",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
        spicy: true,
        popular: false
      },
      {
        name: "Méchoui d'Agneau",
        description: "Épaule d'agneau rôtie aux herbes et épices du Maroc",
        price: "35€",
        image: "https://images.unsplash.com/photo-1517314626714-ac1b9a16515e",
        spicy: false,
        popular: false
      }
    ],
    desserts: [
      {
        name: "Chebakia au Miel",
        description: "Pâtisserie traditionnelle en forme de fleur, parfumée à l'orange et au miel",
        price: "8€",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
        spicy: false,
        popular: true
      },
      {
        name: "Cornes de Gazelle",
        description: "Délicates pâtisseries aux amandes et fleur d'oranger",
        price: "10€",
        image: "https://images.pexels.com/photos/1618929/pexels-photo-1618929.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Mousse au Chocolat à l'Argan",
        description: "Mousse onctueuse parfumée à l'huile d'argan",
        price: "9€",
        image: "https://images.unsplash.com/photo-1517314626714-ac1b9a16515e",
        spicy: false,
        popular: false
      }
    ],
    boissons: [
      {
        name: "Thé à la Menthe",
        description: "Thé vert traditionnel à la menthe fraîche et sucre",
        price: "5€",
        image: "https://images.unsplash.com/photo-1591299089616-c9604047b1a6",
        spicy: false,
        popular: true
      },
      {
        name: "Jus d'Orange Frais",
        description: "Oranges pressées à la minute",
        price: "6€",
        image: "https://images.unsplash.com/photo-1567708417032-bef40ae8cea1",
        spicy: false,
        popular: false
      },
      {
        name: "Café des Épices",
        description: "Café aromatisé à la cardamome et cannelle",
        price: "4€",
        image: "https://images.unsplash.com/photo-1591299089616-c9604047b1a6",
        spicy: false,
        popular: false
      }
    ]
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-gradient-to-b from-amber-50 to-orange-50">
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
            Notre Menu
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Saveurs <span className="text-amber-600">Authentiques</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de plats traditionnels marocains, préparés avec passion selon les recettes ancestrales.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {menuCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:text-amber-600 shadow-md hover:shadow-lg'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {menuItems[activeCategory].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="flex">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {item.popular && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-semibold">
                          Populaire
                        </span>
                      )}
                      {item.spicy && (
                        <Flame className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">
                      {item.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Commander
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
          >
            Télécharger le Menu Complet
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;