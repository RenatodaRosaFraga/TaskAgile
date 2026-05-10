'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthContextType, Usuario } from "../types/usuarios";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const usuarioRecover = Cookies.get('usuario');
        if (!usuarioRecover) return null;
        try {
            return JSON.parse(usuarioRecover) as Usuario;
        } catch (e) {
            console.error(e);
            return null;
        }
    });
    const [token, setToken] = useState<string | null>(() => Cookies.get('token') ?? null);
    const router = useRouter();

    useEffect(() => {
        if (usuario && token) {
            router.push(window.location.pathname);
        }
    }, [router, usuario, token]);

    const login = (usuario: Usuario, token: string) => {
        
        setUsuario(usuario);
        setToken(token);
        Cookies.set('usuario', JSON.stringify(usuario), { expires: 7 });
        Cookies.set('token', token, { expires: 7, secure: true })

    }

    const logout = () => {
        setUsuario(null);
        setToken(null);
        Cookies.remove('usuario');
        Cookies.remove('token');

    }

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro do provider!')
    return context;
}