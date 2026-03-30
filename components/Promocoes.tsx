import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Tag, PlaySquare, Camera } from 'lucide-react';

export const Promocoes = () => {
  const promos = [
    {
      id: 'pro-globoplay',
      name: 'PRO GLOBOPLAY',
      speed: '500 Mega',
      price: '129,90',
      tag: 'GLOBOPLAY',
      features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'],
      icon: PlaySquare
    },
    {
      id: 'pro-basic-cam',
      name: 'PRO BASIC CAM',
      speed: '500 Mega',
      price: '139,90',
      tag: 'CÂMERA',
      features: ['Kaspersky', 'Ubook Go', 'BRD CAM inclusa'],
      icon: Camera
    },
    {
      id: 'plus-globoplay',
      name: 'PLUS GLOBOPLAY',
      speed: '700 Mega',
      price: '159,90',
      tag: 'GLOBOPLAY',
      features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'],
      icon: PlaySquare
    },
    {
      id: 'premium-globoplay',
      name: 'PREMIUM GLOBOPLAY',
      speed: '1000 Mega',
      price: '179,90',
      tag: 'GLOBOPLAY',
      features: ['Kaspersky', 'Ubook Go', 'Globoplay (com anúncios)'],
      icon: PlaySquare
    }
  ];

  return (
    <section id="promocoes" className="py-24 relative z-10 bg-bg-base/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-display font-black tracking-tight text-white mb-4"
            >
              Planos promocionais
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
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-light text-sm font-bold"
          >
            <Tag className="w-4 h-4" />
            <span>Mesmo preço no cartão e no boleto</span>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[20px] bg-bg-card border border-white/5 p-6 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-[0_10px_40px_rgba(0,123,255,0.1)] transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wider text-brand-light uppercase bg-brand-primary/10 px-2.5 py-1 rounded-md">
                  {promo.tag}
                </span>
                <promo.icon className="w-5 h-5 text-text-muted group-hover:text-brand-light transition-colors" />
              </div>
              
              <h3 className="text-lg font-display font-bold text-white mb-1">{promo.name}</h3>
              <div className="text-2xl font-display font-black text-white mb-4">{promo.speed}</div>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm font-medium text-text-muted">R$</span>
                <span className="text-3xl font-bold text-white">{promo.price}</span>
                <span className="text-sm text-text-muted">/mês</span>
              </div>

              <ul className="space-y-2 mb-8 flex-grow">
                {promo.features.map((feature, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contratar"
                className="w-full inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 mt-auto"
              >
                Contratar
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
