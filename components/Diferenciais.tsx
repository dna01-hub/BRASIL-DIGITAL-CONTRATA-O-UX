import React from 'react';
import { motion } from 'motion/react';
import { Network, Activity, Headset, DollarSign, Wifi, Wrench } from 'lucide-react';

export const Diferenciais = () => {
  const features = [
    {
      icon: Network,
      title: 'Fibra 100% própria',
      description: 'Rede proprietária sem compartilhamento. Velocidade real do contrato até o roteador.'
    },
    {
      icon: Activity,
      title: '99.7% de uptime',
      description: 'Monitoramento contínuo com alarmes automáticos. Se cai, sabemos antes de você.'
    },
    {
      icon: Headset,
      title: 'Suporte 24h',
      description: 'WhatsApp, telefone e presencial. Equipe local que conhece Porto Velho.'
    },
    {
      icon: DollarSign,
      title: 'Preço fixo',
      description: 'O valor contratado é o que paga. Sem reajuste escondido.'
    },
    {
      icon: Wifi,
      title: 'Wi-Fi 6 incluso',
      description: 'Roteador de última geração em todos os planos, sem custo adicional.'
    },
    {
      icon: Wrench,
      title: 'Instalação ágil',
      description: 'Agendada em até 7 dias úteis. Técnico uniformizado e identificado.'
    }
  ];

  return (
    <section id="diferenciais" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-black tracking-tight text-text-primary mb-6 leading-tight"
          >
            Infraestrutura de operadora, atendimento de vizinho.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-text-secondary"
          >
            Internet do tamanho de Porto Velho, com qualidade que bate de frente com qualquer capital.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-text-primary/5 border border-text-primary/10 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
