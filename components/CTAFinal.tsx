import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const CTAFinal = () => {
  return (
    <section id="contato" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] bg-bg-card border border-text-primary/5 p-10 sm:p-16 text-center overflow-hidden"
        >
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-light to-brand-primary opacity-50"></div>
          
          {/* Ambient Glow Inside Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-text-primary mb-6 leading-tight">
              Pronto pra ter internet que funciona de verdade?
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary mb-12">
              Contrate pelo site ou fale com a gente no WhatsApp. Sem burocracia, instalação agendada.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contratar"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-cta to-brand-cta-hover px-8 py-4 text-lg font-extrabold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)] transition-all duration-300"
              >
                Contratar online
              </Link>
              <a
                href="https://wa.me/5569999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-[0_8px_32px_rgba(37,211,102,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
