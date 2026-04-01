import React from 'react';
import { motion } from 'motion/react';
import { Network, Wrench, Wifi, Headset } from 'lucide-react';

export const TrustBar = () => {
  const badges = [
    { icon: Network, text: 'Fibra 100% própria' },
    { icon: Wrench, text: 'Instalação ágil' },
    { icon: Wifi, text: 'Wi-Fi 6 incluso' },
    { icon: Headset, text: 'Suporte 24 horas' },
  ];

  return (
    <section className="border-y border-text-primary/5 bg-bg-base/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 text-text-secondary hover:text-text-primary transition-colors group text-center md:text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-text-primary/5 border border-text-primary/10 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 transition-colors">
                <badge.icon className="h-5 w-5 text-brand-primary" />
              </div>
              <span className="text-sm font-bold tracking-wide leading-tight">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
