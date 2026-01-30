"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PokemonCard from '../components/PokemonCard';

export default function HomePage() {
  const { t } = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-8">{t.welcome}</h1>
      <div className="max-w-xs mx-auto">
        {pokemon && <PokemonCard pokemon={pokemon} />}
      </div>
    </main>
  );
}