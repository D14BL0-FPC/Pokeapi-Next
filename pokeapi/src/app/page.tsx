"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PokemonCard from '@/components/PokemonCard';

export default function HomePage() {
  const context = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  // 1. Verificamos que el contexto exista para evitar errores
  if (!context) return null;
  const { t } = context; // Aquí es donde se define 't'

  useEffect(() => {
    // Generamos un Pokémon aleatorio de la primera generación para la bienvenida
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <main className="p-8 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-black mb-12 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
        {t.welcome}
      </h1>
      
      <div className="max-w-sm w-full">
        {/* 2. Pasamos showButton={false} para que no salga el botón en el inicio */}
        {pokemon && (
          <PokemonCard 
            pokemon={pokemon} 
            showButton={false} 
          />
        )}
      </div>
    </main>
  );
}