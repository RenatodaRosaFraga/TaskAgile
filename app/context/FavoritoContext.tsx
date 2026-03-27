'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Projeto } from '@/app/mock/projeto';

interface FavoritoContextType {
  favoritos: Projeto[];
  alternarFavorito: (projeto: Projeto) => void;
  isFavorito: (id: number) => boolean;
}

const FavoritoContext = createContext<FavoritoContextType | undefined>(undefined);

export function FavoritoProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Projeto[]>([]);

  // Carrega favoritos do LocalStorage ao iniciar
  useEffect(() => {
    const salvos = localStorage.getItem('@TaskAgile:favoritos');
    if (salvos) setFavoritos(JSON.parse(salvos));
  }, []);

  // Salva no LocalStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('@TaskAgile:favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const alternarFavorito = (projeto: Projeto) => {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.id === projeto.id);
      if (existe) {
        return prev.filter((p) => p.id !== projeto.id); // Remove se já for favorito
      }
      return [...prev, projeto]; // Adiciona se não for
    });
  };

  const isFavorito = (id: number) => favoritos.some((p) => p.id === id);

  return (
    <FavoritoContext.Provider value={{ favoritos, alternarFavorito, isFavorito }}>
      {children}
    </FavoritoContext.Provider>
  );
}

export const useFavoritos = () => {
  const context = useContext(FavoritoContext);
  if (!context) throw new Error('useFavoritos deve ser usado dentro de um FavoritoProvider');
  return context;
};