import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Leaf, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('brunch');
  const { addToCart } = useCart();

  const handleAddToCart = (item, category) => {
    addToCart({
      ...item,
      category: category
    });
  };

  const menuCategories = [
    { id: 'brunch', label: 'Brunch Oriental', icon: <Coffee className="w-5 h-5" /> },
    { id: 'semaine', label: 'Menu Semaine', icon: <Star className="w-5 h-5" /> },
    { id: 'entrees', label: 'Entrées', icon: <Leaf className="w-5 h-5" /> },
    { id: 'plats', label: 'Plats Principaux', icon: <Flame className="w-5 h-5" /> },
    { id: 'desserts', label: 'Desserts', icon: <Star className="w-5 h-5" /> },
    { id: 'boissons', label: 'Boissons', icon: <Star className="w-5 h-5" /> }
  ];

  const menuItems = {
    brunch: [
      {
        name: "Brunch Samedi - Menu Complet",
        description: "Brunch marocain authentique : assortiment de pains locaux, harcha, baghrir, tajine khliaa aux œufs",
        price: "18,00€",
        image: "https://images.pexels.com/photos/14017961/pexels-photo-14017961.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Pain à l'Orge & Miel",
        description: "Pain à l'orge avec texture dense et saveur de noisette, accompagné de miel et olives noires ou vertes",
        price: "Inclus",
        image: "https://images.unsplash.com/photo-1598258398450-1011a5b05a41",
        spicy: false,
        popular: true
      },
      {
        name: "Harcha - Galette de Semoule",
        description: "Galette de semoule se distinguant par sa croûte croustillante et son intérieur tendre",
        price: "Inclus",
        image: "https://images.pexels.com/photos/7631152/pexels-photo-7631152.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Baghrir - Crêpes Mille Trous",
        description: "Crêpes traditionnelles avec texture aérée qui absorbe le miel doré et les confitures maison",
        price: "Inclus",
        image: "https://images.pexels.com/photos/32292781/pexels-photo-32292781.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Tajine Khliaa aux Œufs",
        description: "Mélange de saveurs robustes, viande séchée avec intensité salée équilibrée par œufs",
        price: "Inclus",
        image: "https://images.pexels.com/photos/30068444/pexels-photo-30068444.jpeg",
        spicy: true,
        popular: false
      },
      {
        name: "Soupe de Semoule au Miel",
        description: "Soupe de semoule au miel ou à l'anis pour conclure le repas en douceur",
        price: "Inclus",
        image: "https://images.pexels.com/photos/17023410/pexels-photo-17023410.jpeg",
        spicy: false,
        popular: false
      }
    ],
    semaine: [
      {
        name: "Lundi - Tajines du Chef",
        description: "Harmonie de saveurs avec tajine d'agneau aux pruneaux et amandes ou tajine de poulet au citron confit",
        price: "15,90€",
        image: "https://images.unsplash.com/photo-1517315314851-5d0c36a36e02",
        spicy: false,
        popular: true
      },
      {
        name: "Lundi - Grillades Assortiment",
        description: "Brochettes d'agneau, kefta, poulet mariné et bien plus pour tous les goûts",
        price: "19,90€",
        image: "https://images.pexels.com/photos/28902897/pexels-photo-28902897.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Mardi - Tajines de la Mer",
        description: "Voyage gustatif unique mêlant trésors de l'océan aux épices, tajine de poisson aux légumes ou fruits de mer chermoula",
        price: "15,90€",
        image: "https://images.unsplash.com/photo-1519624014191-508652cbd7b5",
        spicy: false,
        popular: true
      },
      {
        name: "Mardi - Grillades Océanes",
        description: "Brochettes de poissons grillés, sardines marines selon l'arrivage du jour, fraîcheur garantie",
        price: "19,90€",
        image: "https://images.unsplash.com/photo-1534121222821-9e2e2936f059",
        spicy: false,
        popular: false
      },
      {
        name: "Mercredi - Grillades Poulet",
        description: "Poulet braisé au feu de bois ou farci, accompagné de frites ou légumes sautés",
        price: "12,90€",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
        spicy: false,
        popular: false
      },
      {
        name: "Jeudi - Spécialité Tangia Marrakech",
        description: "Savoureuse tangia de Marrakech vous attend, promettant une expérience culinaire riche en goût",
        price: "19,90€",
        image: "https://images.pexels.com/photos/1618929/pexels-photo-1618929.jpeg",
        spicy: true,
        popular: true
      },
      {
        name: "Vendredi - Couscous Royal",
        description: "Festin royal offrant des options pour tous, du couscous royal au couscous de la semaine en beauté",
        price: "19,90€",
        image: "https://images.pexels.com/photos/29594950/pexels-photo-29594950.jpeg",
        spicy: false,
        popular: true
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
        name: "Pâtisseries Maison",
        description: "Choix de gâteaux marocains et orientaux préparés à la maison selon la tradition",
        price: "3,00€",
        image: "https://images.pexels.com/photos/18077172/pexels-photo-18077172.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Chebakia au Miel",
        description: "Pâtisserie traditionnelle en forme de fleur, parfumée à l'orange et au miel",
        price: "3,00€",
        image: "https://images.pexels.com/photos/30068451/pexels-photo-30068451.jpeg",
        spicy: false,
        popular: true
      },
      {
        name: "Cornes de Gazelle",
        description: "Délicates pâtisseries aux amandes et fleur d'oranger, savoir-faire ancestral",
        price: "3,00€",
        image: "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227",
        spicy: false,
        popular: false
      },
      {
        name: "Assortiment Oriental",
        description: "Variété de douceurs orientales aux amandes, miel et eau de fleur d'oranger",
        price: "3,00€",
        image: "https://images.unsplash.com/photo-1574810220185-df93df6f81e5",
        spicy: false,
        popular: false
      }
    ],
    boissons: [
      {
        name: "Thé à la Menthe Traditionnel",
        description: "Thé vert traditionnel à la menthe fraîche, préparé selon la tradition marocaine",
        price: "2,80€",
        image: "https://images.unsplash.com/photo-1591299089616-c9604047b1a6",
        spicy: false,
        popular: true
      },
      {
        name: "Jus d'Orange Pressé",
        description: "Oranges fraîches pressées à la minute, vitamines et fraîcheur garanties",
        price: "3,50€",
        image: "https://images.unsplash.com/photo-1640625488786-ac3975ac3bf4",
        spicy: false,
        popular: true
      },
      {
        name: "Café Traditionnel",
        description: "Café préparé à la manière traditionnelle, servi dans de petites tasses",
        price: "2,50€",
        image: "https://images.pexels.com/photos/8963983/pexels-photo-8963983.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Mojito Le Club (Sans Alcool)",
        description: "Notre signature cocktail virgin à base de menthe fraîche et citron vert",
        price: "3,50€",
        image: "https://images.unsplash.com/photo-1634496064950-02f043806b09",
        spicy: false,
        popular: true
      },
      {
        name: "Pina Colada Virgin",
        description: "Cocktail tropical sans alcool à base de coco et ananas frais",
        price: "3,50€",
        image: "https://images.pexels.com/photos/28575243/pexels-photo-28575243.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Eau Pétillante",
        description: "Eau gazeuse fraîche servie avec quartier de citron",
        price: "2,50€",
        image: "https://images.unsplash.com/photo-1453825012366-3738046cb6c7",
        spicy: false,
        popular: false
      },
      {
        name: "Boissons Gazeuses",
        description: "Sélection de sodas et boissons gazeuses rafraîchissantes",
        price: "2,80€",
        image: "https://images.pexels.com/photos/8880727/pexels-photo-8880727.jpeg",
        spicy: false,
        popular: false
      },
      {
        name: "Limonade Le Club",
        description: "Limonade maison fraîche à base de sirop artisanal et citron pressé",
        price: "2,50€",
        image: "https://images.pexels.com/photos/11070660/pexels-photo-11070660.jpeg",
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
                    {/* Afficher le bouton Commander seulement pour le premier élément du brunch ou les autres catégories */}
                    {(activeCategory !== 'brunch' || index === 0) && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Commander
                      </motion.button>
                    )}
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