"use client";
import { useLanguage } from '@/context/LanguageContext';

// Añadimos showButton como prop opcional que por defecto es true
export default function PokemonCard({ pokemon, showButton = true }: { pokemon: any, showButton?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className="animate-card bg-white rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all duration-500 border border-slate-100 group">
      <div className="relative">
        <span className="absolute top-0 left-0 text-[3rem] font-black text-slate-50 opacity-10 select-none">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
        
        <div className="relative h-48 flex items-center justify-center">
          <div className="absolute w-32 h-32 bg-slate-50 rounded-full group-hover:scale-110 transition-transform duration-500" />
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="w-40 h-40 object-contain relative z-10 drop-shadow-2xl group-hover:-translate-y-4 transition-transform duration-500"
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-1">
            {pokemon.types[0].type.name}
          </p>
          <h3 className="text-2xl font-black text-slate-800 capitalize mb-2 italic">
            {pokemon.name}
          </h3>
          
          {/* Solo mostramos el botón si showButton es true */}
          {showButton && (
            <button className="w-full py-4 mt-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
              {t.details}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}