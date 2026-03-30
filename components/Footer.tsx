import React from 'react';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050508] relative z-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1 */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-light shadow-lg">
                <Zap className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black tracking-tight text-white leading-none">Brasil</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-light leading-none mt-1">DIGITAL</span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Provedor de internet fibra óptica em Porto Velho, Rondônia. Qualidade, estabilidade e atendimento local.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Planos</h4>
            <ul className="space-y-4">
              <li><a href="#planos" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Maceta Pro (500 Mega)</a></li>
              <li><a href="#planos" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Maceta Plus (700 Mega)</a></li>
              <li><a href="#planos" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Maceta Premium (1000 Mega)</a></li>
              <li><a href="#promocoes" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Planos Promocionais</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Suporte</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Central do Assinante</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">2ª Via de Boleto</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Teste de Velocidade</a></li>
              <li><a href="#contato" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Institucional</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-brand-light transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Brasil Digital. Todos os direitos reservados.
          </p>
          <p className="text-xs text-text-muted">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>

      </div>
    </footer>
  );
};
