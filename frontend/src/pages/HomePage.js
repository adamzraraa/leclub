import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Events from '../components/Events';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Events />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;