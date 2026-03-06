'use client'

import { createContext, ReactNode, useContext, useState } from "react";

export class Usuario{
    constructor(
        public codigo: number,
        public name: string
    ){}
}

interface AuthContextType{
    usuario:Usuario | null,
    token: string | null,
    login:( usuario: Usuario, token: string) => void,
    logout:() => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children:ReactNode}){
    const [usuario, setUsuario] = useState<Usuario|null>(null);
    const [token, setToken] = useState<string|null>(null);

    const login = (Usuario: Usuario, token:string)=>{
        setUsuario(usuario);
        setToken(token);
    }
    const logout = ()=>{
        setUsuario(null);
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{usuario, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro do provider!')

 
    return context;

}
