import { Usuario } from "./usuarios";

export interface LoginResponse{
    token: string
}

export interface AuthState {
    usuario: Usuario | null; 
    token: string;
}