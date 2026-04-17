'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Projeto } from '@/app/types/projetos';
import { FavoritoContextType } from '@/app/types/favorito';

const FavoritoContext = createContext<FavoritoContextType | undefined>(undefined);

const COOKIE_NAME = '@TaskAgile:favoritos';

export function FavoritoProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Projeto[]>([]);

  // 1. Carrega favoritos dos Cookies ao iniciar
  useEffect(() => {
    const salvos = Cookies.get(COOKIE_NAME);
    if (salvos) {
      try {
        setFavoritos(JSON.parse(salvos));
      } catch (e) {
        console.error("Erro ao converter favoritos dos cookies", e);
      }
    }
  }, []);

  // 2. Salva nos Cookies sempre que a lista mudar
  useEffect(() => {
    // Só salva se houver alteração real para evitar loops ou cookies vazios indevidos
    Cookies.set(COOKIE_NAME, JSON.stringify(favoritos), { expires: 7, path: '/' });
  }, [favoritos]);

  const alternarFavorito = (projeto: Projeto) => {
    setFavoritos((prev) => {
      // Verificação de ID para evitar erros de tipagem caso o ID seja undefined
      const existe = prev.find((p) => p.id === projeto.id);
      if (existe) {
        return prev.filter((p) => p.id !== projeto.id);
      }
      return [...prev, projeto];
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