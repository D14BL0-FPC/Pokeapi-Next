"use client";
import { useEffect, useState, use } from 'react';
import PokemonCard from '@/components/PokemonCard';
import { useLanguage } from '@/context/LanguageContext';

const genRanges: any = {
  '1': { min: 1, max: 151 },
  '2': { min: 152, max: 251 },
  '3': { min: 252, max: 386 }
};

export default function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchGen = async () => {
      setLoading(true);
      const range = genRanges[id];
      if (!range) return;

      // 1. Garantizamos 10 IDs únicos usando un Set
      const idsSet = new Set<number>();
      while (idsSet.size < 10) {
        const randomId = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        idsSet.add(randomId);
      }
      
      const ids = Array.from(idsSet);
      
      try {
        const results = await Promise.all(ids.map(pokemonId => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => res.json())
        ));
        setPokemons(results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGen();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-xl font-bold animate-pulse">{t.loading}</p>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-600 uppercase tracking-wider">
        {t[`gen${id}`]}
      </h2>

      {/* Grid de Pokemon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {pokemons.map((p) => (
          <div 
            key={p.id} 
            onClick={() => setSelectedPokemon(p)} 
            className="cursor-pointer transform hover:scale-105 transition-transform"
          >
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>

      {/* Ventana Modal de Detalles */}
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedPokemon(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-3xl leading-none"
            >
              &times;
            </button>
            
            <div className="text-center">
              <img 
                src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default} 
                className="w-48 h-48 mx-auto drop-shadow-lg" 
                alt={selectedPokemon.name} 
              />
              <p className="text-gray-400 font-mono mt-2">Nº {selectedPokemon.id}</p>
              <h2 className="text-3xl font-bold capitalize text-gray-800">{selectedPokemon.name}</h2>
            </div>

            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.stats.hp}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  {selectedPokemon.stats[0].base_stat}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.stats.attack}</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                  {selectedPokemon.stats[1].base_stat}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{t.stats.defense}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                  {selectedPokemon.stats[2].base_stat}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}