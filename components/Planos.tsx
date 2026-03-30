import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, Upload, Users, ShieldCheck, PlaySquare, Camera } from 'lucide-react';

export const Planos = () => {
  const plans = [
    {
      id: 'maceta-pro',
      name: 'MACETA PRO',
      speed: '500',
      upload: '250 Mbps',
      priceCard: '119,90',
      priceBoleto: '129,90',
      priceNoFidelity: '159,90',
      features: ['Kaspersky', 'Ubook Go', '1 App PlayHub à escolha'],
      profile: '1–2 pessoas',
      highlight: false,
      icons: [ShieldCheck, PlaySquare]
    },
    {
      id: 'maceta-plus',
      name: 'MACETA PLUS',
      speed: '700',
      upload: '350 Mbps',
      priceCard: '149,90',
      priceBoleto: '159,90',
      priceNoFidelity: '199,90',
      features: ['Kaspersky', 'Ubook Go', 'Câmera BRD CAM inclusa'],
      profile: '3–5 pessoas',
      highlight: true,
      badge: 'MAIS VENDIDO',
      icons: [ShieldCheck, Camera]
    },
    {
      id: 'maceta-premium',
      name: 'MACETA PREMIUM',
      speed: '1000',
      upload: '500 Mbps',
      priceCard: '169,90',
      priceBoleto: '179,90',
      priceNoFidelity: '219,90',
      features: ['Kaspersky', 'Ubook Go', 'Câmera BRD CAM inclusa'],
      profile: '6+ pessoas',
      highlight: false,
      icons: [ShieldCheck, Camera]
    }
  ];

  return (
    <section id="planos" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-4"
          >
            Escolha sua velocidade
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-secondary"
          >
            Todos com fibra 100% própria, Wi-Fi 6, instalação grátis e fidelidade de 12 meses.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-[24px] bg-bg-base border transition-all duration-300 hover:-translate-y-2 group ${
                plan.highlight 
                  ? 'border-brand-primary/50 shadow-[0_0_40px_rgba(0,123,255,0.15)] hover:shadow-[0_0_60px_rgba(0,123,255,0.25)]' 
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 right-6 bg-gradient-to-r from-brand-badge to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-b-xl uppercase tracking-wider shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-display font-bold text-brand-light mb-2">{plan.name}</h3>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-display font-black text-white">{plan.speed}</span>
                  <span className="text-xl font-bold text-text-muted">Mega</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-text-secondary mb-8 bg-white/5 rounded-lg px-3 py-2 w-fit">
                  <Upload className="w-4 h-4 text-brand-primary" />
                  <span>Upload: {plan.upload}</span>
                </div>

                <div className="space-y-1 mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-text-muted">R$</span>
                    <span className="text-3xl font-bold text-white">{plan.priceCard}</span>
                    <span className="text-sm text-text-muted">/mês no cartão</span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    R$ {plan.priceBoleto} boleto | R$ {plan.priceNoFidelity} sem fidelidade
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-primary">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-brand-light" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-text-secondary pt-2 border-t border-white/5">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      <Users className="w-4 h-4 text-text-muted" />
                    </div>
                    <span className="text-sm">Perfil: {plan.profile}</span>
                  </li>
                </ul>

                <Link
                  to="/contratar"
                  className={`w-full flex items-center justify-center rounded-2xl py-4 text-lg font-bold transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-brand-cta to-brand-cta-hover text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:-translate-y-0.5'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:-translate-y-0.5'
                  }`}
                >
                  Contratar
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
