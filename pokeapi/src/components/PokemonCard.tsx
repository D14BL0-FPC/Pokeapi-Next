"use client";
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function PokemonCard({ pokemon }: { pokemon: any }) {
  const { t } = useLanguage();
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 mx-auto" />
      <p className="text-gray-500 text-sm">#{pokemon.id}</p>
      <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
      <Link 
        href={`?showModal=true&id=${pokemon.id}`} 
        className="mt-4 block text-center bg-blue-500 text-white py-1 rounded"
      >
        {t.details}
      </Link>
    </div>
  );
}