import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Tag, PlaySquare, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const PricingSwitch = ({ isFidelity, setIsFidelity, layoutIdPrefix }: { isFidelity: boolean, setIsFidelity: (v: boolean) => void, layoutIdPrefix: string }) => {
  return (
    <div className="flex justify-center mb-16">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-bg-card border border-text-primary/10 p-1 shadow-sm">
        <button
          onClick={() => setIsFidelity(true)}
          className={cn(
            "relative z-10 w-fit h-12 rounded-full sm:px-8 px-4 font-bold transition-colors",
            isFidelity ? "text-white" : "text-text-secondary hover:text-text-primary",
          )}
        >
          {isFidelity && (
            <motion.span
              layoutId={`switch-${layoutIdPrefix}`}
              className="absolute top-0 left-0 h-full w-full rounded-full bg-brand-primary shadow-md"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Com Fidelidade</span>
        </button>

        <button
          onClick={() => setIsFidelity(false)}
          className={cn(
            "relative z-10 w-fit h-12 flex-shrink-0 rounded-full sm:px-8 px-4 font-bold transition-colors",
            !isFidelity ? "text-white" : "text-text-secondary hover:text-text-primary",
          )}
        >
          {!isFidelity && (
            <motion.span
              layoutId={`switch-${layoutIdPrefix}`}
              className="absolute top-0 left-0 h-full w-full rounded-full bg-brand-primary shadow-md"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Sem Fidelidade</span>
        </button>
      </div>
    </div>
  );
};

export const Promocoes = () => {
  const [isFidelity, setIsFidelity] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
          const scrollAmount = carouselRef.current.clientWidth;
          carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
  };

  const promos = [
    {
      id: 'pro-globoplay',
      name: 'PRO GLOBOPLAY',
      speed: '500 Mega',
      priceCard: '129,90',
      priceNoFidelity: '169,90',
      tag: 'GLOBOPLAY',
      features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'],
      icon: PlaySquare
    },
    {
      id: 'pro-basic-cam',
      name: 'PRO BASIC CAM',
      speed: '500 Mega',
      priceCard: '139,90',
      priceNoFidelity: '179,90',
      tag: 'CÂMERA',
      features: ['Kaspersky', 'Ubook Go', 'BRD CAM inclusa'],
      icon: Camera
    },
    {
      id: 'plus-globoplay',
      name: 'PLUS GLOBOPLAY',
      speed: '700 Mega',
      priceCard: '159,90',
      priceNoFidelity: '199,90',
      tag: 'GLOBOPLAY',
      features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'],
      icon: PlaySquare
    },
    {
      id: 'premium-globoplay',
      name: 'PREMIUM GLOBOPLAY',
      speed: '1000 Mega',
      priceCard: '179,90',
      priceNoFidelity: '219,90',
      tag: 'GLOBOPLAY',
      features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'],
      icon: PlaySquare
    }
  ];

  return (
    <section id="promocoes" className="py-24 relative z-10 bg-bg-base/30 border-y border-text-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-black tracking-tight text-text-primary mb-6"
          >
            Planos Promocionais
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-secondary"
          >
            Alternativas com Globoplay ou BRD CAM. Mesmo preço no cartão e no boleto.
          </motion.p>
        </div>

        <PricingSwitch isFidelity={isFidelity} setIsFidelity={setIsFidelity} layoutIdPrefix="promocoes" />

        <div className="relative group/carousel -mx-2 sm:-mx-4 px-2 sm:px-4 lg:mx-auto lg:px-0">
          <button 
              onClick={() => scrollCarousel('left')}
              className="lg:hidden absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-brand-primary transition-all"
          >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button 
              onClick={() => scrollCarousel('right')}
              className="lg:hidden absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg text-slate-600 hover:text-brand-primary transition-all"
          >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div ref={carouselRef} className="flex overflow-x-auto lg:grid lg:grid-cols-4 snap-x snap-mandatory gap-4 sm:gap-6 pb-8 pt-4 px-2 lg:px-0 hide-scrollbar w-full scroll-smooth items-stretch">
            {promos.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[32px] bg-bg-card border border-text-primary/10 p-8 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-[0_10px_40px_rgba(0,123,255,0.1)] transition-all duration-300 flex flex-col h-full w-full shrink-0 md:w-[calc(50%-12px)] lg:w-auto snap-start"
              >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold tracking-wider text-brand-primary uppercase bg-brand-primary/10 px-3 py-1.5 rounded-full">
                  {promo.tag}
                </span>
                <promo.icon className="w-5 h-5 text-text-muted group-hover:text-brand-primary transition-colors" />
              </div>
              
              <div className="text-left mb-6">
                <h3 className="text-xl font-display font-bold text-text-primary mb-1">{promo.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{promo.speed}</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-black text-text-primary">
                    R$ {isFidelity ? promo.priceCard : promo.priceNoFidelity}
                  </span>
                  <span className="text-sm font-bold text-text-muted">/mês</span>
                </div>
              </div>

              <Link
                to="/contratar"
                state={{ planId: promo.id === 'pro-globoplay' ? 4 : promo.id === 'pro-basic-cam' ? 5 : promo.id === 'plus-globoplay' ? 6 : 7 }}
                className="w-full inline-flex items-center justify-center rounded-xl bg-text-primary/5 border border-text-primary/10 px-4 py-4 text-base font-bold text-text-primary hover:bg-text-primary/10 hover:-translate-y-0.5 transition-all duration-300 mb-6"
              >
                Contratar
              </Link>

              <div className="space-y-4 pt-6 border-t border-text-primary/10 flex-grow">
                <h4 className="font-bold text-sm text-text-primary mb-4">O que está incluso:</h4>
                <ul className="space-y-3">
                  {promo.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <span className="mt-1.5 h-2 w-2 bg-brand-primary rounded-full flex-shrink-0"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};
