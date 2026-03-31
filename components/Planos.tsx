import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

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

export const Planos = () => {
  const [isFidelity, setIsFidelity] = useState(true);

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
    }
  ];

  return (
    <section id="planos" className="py-24 sm:py-32 relative z-10 bg-bg-deep overflow-hidden">
      {/* Background Effects similar to the requested design */}
      <div className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--color-brand-primary) 0%, transparent 70%)',
          opacity: 0.15,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-black tracking-tight text-text-primary mb-6"
          >
            Planos que funcionam melhor para você
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-secondary"
          >
            Todos com fibra 100% própria, Wi-Fi 6, instalação ágil e suporte local. Explore qual opção é a certa para você.
          </motion.p>
        </div>

        <PricingSwitch isFidelity={isFidelity} setIsFidelity={setIsFidelity} layoutIdPrefix="planos" />

        <div className="grid lg:grid-cols-3 gap-6 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-[32px] p-8 transition-all duration-300 flex flex-col h-full ${
                plan.highlight 
                  ? 'bg-bg-card border-2 border-brand-primary/50 shadow-[0_0_40px_rgba(0,123,255,0.15)] z-20 md:scale-105' 
                  : 'bg-bg-base border border-text-primary/10 z-10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-badge to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="text-left mb-8">
                <h3 className="text-2xl font-display font-bold text-text-primary mb-2">{plan.name}</h3>
                <p className="text-sm text-text-secondary mb-6">{plan.speed} MEGA • Upload {plan.upload}</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black text-text-primary">
                    R$ {isFidelity ? plan.priceCard : plan.priceNoFidelity}
                  </span>
                  <span className="text-sm font-bold text-text-muted">/mês</span>
                </div>
                {isFidelity && (
                  <p className="text-xs text-text-muted mt-2">R$ {plan.priceBoleto} no boleto</p>
                )}
              </div>

              <Link
                to="/contratar"
                className={`w-full flex items-center justify-center rounded-xl py-4 text-lg font-bold transition-all duration-300 mb-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-brand-cta to-brand-cta-hover text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:-translate-y-0.5'
                    : 'bg-text-primary/5 text-text-primary border border-text-primary/10 hover:bg-text-primary/10 hover:-translate-y-0.5'
                }`}
              >
                Contratar
              </Link>

              <div className="space-y-4 pt-6 border-t border-text-primary/10 flex-grow">
                <h4 className="font-bold text-sm text-text-primary mb-4">O que está incluso:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <span className="mt-1.5 h-2 w-2 bg-brand-primary rounded-full flex-shrink-0"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-text-secondary pt-2">
                    <span className="mt-1.5 h-2 w-2 bg-text-muted rounded-full flex-shrink-0"></span>
                    <span className="text-sm">Perfil: {plan.profile}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
