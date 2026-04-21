'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Usuario } from "../types/usuarios";
import { LoginResponse } from "../types/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();


  const handleLogin = async (formData: FormData) => {

    const email = formData.get('email');
    const senha = formData.get('senha');

    try {

      // //var loginResult = await fetch("http//localhost:8080/auth/login", {
      //   method : 'POST',
      //   headers:{
      //     'Content-Type':'application/json'
      //   },
      //   body: JSON.stringify({email:email, senha})
      // });

      const loginResult = await axios.post<LoginResponse>('http://localhost:8080/auth/login',
        { email:'String@s', senha:'String@s' }); // Credenciais hardcoded do backend

      if (loginResult.status !== 200) {
        alert("Usuario ou senha inválido!")
        return;
      }

      const usuarioMock = new Usuario(1, "Renato Fraga", "", "ATIVO");


      login(usuarioMock, loginResult.data.Token)


    } catch (error) {
      alert("Erro ao entrar no sistema!");
    }


    console.log(`autenticado com email: ${email}`)

    router.push("/home")
  }


  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 antialiased flex flex-col justify-center py-12 px-6">

      <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white font-black text-2xl shadow-2xl shadow-slate-950/30">
            TA
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-slate-950">
            TaskAgile
          </h1>
          <p className="text-slate-500 font-medium">Gestão sem esforço.</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white px-8 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 rounded-[2.5rem]">
          {/* Usando action do React 19 */}
          <form action={handleLogin} className="space-y-6">

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                E-mail Profissional
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="nome@empresa.com"
                className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Senha
                </label>
                <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-950 transition-colors">
                  Esqueceu?
                </a>
              </div>
              <input
                required
                name="senha"
                type="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center"
            >
              Entrar no App
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-50 pt-8">
            <p className="text-sm text-slate-500 font-medium">
              Não tem conta?{' '}
              <a href="#" className="text-slate-950 font-bold hover:underline underline-offset-4">
                Criar agora
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}