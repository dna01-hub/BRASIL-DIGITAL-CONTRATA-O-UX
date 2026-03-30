import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cta"></span>
            </span>
            <span className="text-sm font-medium text-text-secondary">Cobertura ativa em Porto Velho e região</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[1.1] mb-6 text-white"
          >
            Internet fibra <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent">que não te deixa na mão.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed"
          >
            Fibra óptica 100% própria. Velocidade real do contrato até a sua casa. Wi-Fi 6 incluso, instalação grátis e planos a partir de R$ 119,90.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#planos"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-cta to-brand-cta-hover px-8 py-4 text-lg font-extrabold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)] transition-all duration-300"
            >
              Ver planos
            </a>
            <a
              href="https://wa.me/5569999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex items-center gap-6 text-sm text-text-muted font-medium"
          >
            <div className="flex flex-col">
              <span className="text-white text-xl font-display font-bold">15k+</span>
              <span>Clientes</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-display font-bold">99.7%</span>
              <span>Uptime</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-display font-bold">100%</span>
              <span>Fibra Própria</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Speed Dial */}
        <div className="hidden lg:flex justify-center items-center relative h-[500px] z-0">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="speed-ring w-[480px] h-[480px] border-brand-primary/20" style={{ animationDuration: '30s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_15px_#007bff]"></div>
            </div>
            
            {/* Middle Ring */}
            <div className="speed-ring w-[340px] h-[340px] border-brand-light/30" style={{ animationDuration: '22s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-brand-light shadow-[0_0_20px_#00c6ff]"></div>
            </div>
            
            {/* Inner Ring */}
            <div className="speed-ring w-[200px] h-[200px] border-brand-cta/40" style={{ animationDuration: '16s' }}>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-cta shadow-[0_0_10px_#10b981]"></div>
            </div>

            {/* Center Content */}
            <div className="absolute flex flex-col items-center justify-center w-32 h-32 rounded-full bg-bg-card border border-white/10 shadow-2xl backdrop-blur-md z-10">
              <span className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">1</span>
              <span className="text-sm font-bold text-brand-light tracking-widest">Gbps</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
