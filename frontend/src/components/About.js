import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion Authentique",
      description: "Chaque plat est préparé avec amour selon les recettes traditionnelles transmises de génération en génération."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence Culinaire", 
      description: "Des ingrédients de première qualité et des épices importées directement du Maroc pour une authenticité incomparable."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expérience Conviviale",
      description: "Un service chaleureux dans une ambiance qui évoque la beauté et l'hospitalité marocaine."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tradition Préservée",
      description: "Plus de 20 ans d'expérience dans l'art culinaire marocain, un héritage de saveurs préservé avec fierté."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
              >
                Notre Histoire
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                L'Art de la <span className="text-amber-600">Cuisine Marocaine</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bienvenue au Restaurant Le Club, où chaque repas est une célébration de la riche tradition culinaire marocaine. 
                Notre restaurant vous transporte au cœur du Maroc avec des saveurs authentiques et une atmosphère chaleureuse 
                qui évoque les riads traditionnels de Marrakech et Fès.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nos chefs passionnés utilisent des recettes ancestrales et des épices soigneusement sélectionnées pour créer 
                des plats qui honorent l'héritage gastronomique du Royaume. De nos tajines parfumés à notre couscous royal, 
                chaque bouchée raconte l'histoire d'une culture millénaire.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-amber-600 mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://i.postimg.cc/QMfmQB36/469099533-122124969434530331-9045116862422457577-n.jpg"
                alt="Restaurant Le Club - Façade authentique avec architecture marocaine traditionnelle"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Decorative Pattern Overlay */}
              <div className="absolute top-4 right-4 w-20 h-20 opacity-80">
                <div 
                  className="w-full h-full bg-repeat"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1458682625221-3a45f8a844c7')`,
                    backgroundSize: '100px 100px'
                  }}
                ></div>
              </div>
              
              {/* Stats Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-amber-600">5+</div>
                      <div className="text-sm text-gray-600">Années d'Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-600">5000+</div>
                      <div className="text-sm text-gray-600">Clients Satisfaits</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-600">20+</div>
                      <div className="text-sm text-gray-600">Plats Traditionnels</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-amber-400 to-red-500 rounded-full opacity-20"
            ></motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-br from-red-400 to-amber-500 rounded-full opacity-20"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;