'use client';

import { createContext, ReactNode, useContext, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
// Importando do novo arquivo centralizado
import { type AuthContextType, Usuario } from "../types/auth"; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const hydrateAuth = () => {
      const usuarioRecover = Cookies.get('usuario');
      const tokenRecover = Cookies.get('token');

      if (usuarioRecover && tokenRecover) {
        try {
          const data = JSON.parse(usuarioRecover);
          // Instanciando a classe Usuario com os dados recuperados
          setUsuario(new Usuario(data.codigo, data.nome, data.email || "", data.status || "ATIVO"));
          setToken(tokenRecover);
        } catch (e) {
          console.error("Erro ao restaurar sessão:", e);
        }
      }
      setIsInitializing(false);
    };

    hydrateAuth();
  }, []);

  const login = (novoUsuario: Usuario, novoToken: string) => {
    setUsuario(novoUsuario);
    setToken(novoToken);
    
    // Persistência em Cookies (Sessão de 7 dias)
    Cookies.set('usuario', JSON.stringify(novoUsuario), { expires: 7, sameSite: 'lax' });
    Cookies.set('token', novoToken, { expires: 7, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
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