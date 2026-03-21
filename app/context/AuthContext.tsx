'use client';

import { createContext, ReactNode, useContext, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";

export class Usuario {
  constructor(public id: number, public nome: string, public email: string, public status: string) {}
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
  isInitializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Função interna para evitar chamadas síncronas diretas que irritam o React 19
    const hydrateAuth = () => {
      const usuarioRecover = Cookies.get('usuario');
      const tokenRecover = Cookies.get('token');

      if (usuarioRecover && tokenRecover) {
        try {
          const data = JSON.parse(usuarioRecover);
          // Só atualizamos se os dados forem realmente novos/diferentes
          setUsuario(new Usuario(data.codigo, data.nome, "", "ATIVO" ));
          setToken(tokenRecover);
        } catch (e) {
          console.error("Erro ao restaurar sessão:", e);
        }
      }
      
      // Usamos um pequeno delay ou garantimos que isso rode após o ciclo de render
      setIsInitializing(false);
    };

    hydrateAuth();
  }, []);

  const login = (novoUsuario: Usuario, novoToken: string) => {
    setUsuario(novoUsuario);
    setToken(novoToken);
    Cookies.set('usuario', JSON.stringify(novoUsuario), { expires: 7, sameSite: 'lax' });
    Cookies.set('token', novoToken, { expires: 7, secure: true, sameSite: 'lax' });
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    Cookies.remove('usuario');
    Cookies.remove('token');
    window.location.href = '/login';
  };

  const contextValue = useMemo(() => ({
    usuario,
    token,
    login,
    logout,
    isInitializing
  }), [usuario, token, isInitializing]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider!');
  return context;
};