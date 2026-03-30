import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { Planos } from '../components/Planos';
import { Promocoes } from '../components/Promocoes';
import { Diferenciais } from '../components/Diferenciais';
import { CTAFinal } from '../components/CTAFinal';
import { Footer } from '../components/Footer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-deep font-sans text-text-primary selection:bg-brand-primary selection:text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="ambient-glow top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="ambient-glow bottom-0 right-0 w-[700px] h-[700px] translate-x-1/3 translate-y-1/3" style={{ animationDelay: '-12s' }}></div>
      <div className="grid-overlay"></div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Planos />
          <Promocoes />
          <Diferenciais />
          <CTAFinal />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </div>
  );
};

export default Home;
