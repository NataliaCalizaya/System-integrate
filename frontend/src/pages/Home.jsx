import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi"; 
import Login from './Login';

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
};

const Home = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSubmitting(true);
    
        try {
            const { user } = await loginUser({ username, password });
            const { id, name, role } = user;
    
            setCookie("id", String(id));
            setCookie("name", name);
            setCookie("role", role);
    
            navigate("/dashboard", { replace: true }); 
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || "Error de credenciales.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="relative w-full">
            {/* CAMBIO 1: `min-h-screen` permite scroll en móviles.
               CAMBIO 2: `py-12 md:py-0` da espacio arriba/abajo en móvil, pero lo quita en desktop para centrar.
            */}
            <div 
                className="relative min-h-screen flex items-center py-12 md:py-0 bg-cover bg-center bg-fixed" 
                style={{
                    backgroundImage: "linear-gradient(rgba(30, 41, 59, 0.85), rgba(30, 41, 59, 0.7)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070')"
                }}
            >
                <div className="container mx-auto px-6 h-full">
                    {/* Grid se convierte en 1 columna en móvil y 2 en desktop (md) */}
                    <div className="grid md:grid-cols-2 gap-12 w-full items-center">
                        
                        {/* Left Side - Info */}
                        <div className="text-white text-center md:text-left">
                            {/* CAMBIO 3: Texto más chico en móvil (3xl) y grande en desktop (5xl) */}
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Sistema Integrado de Gestión de Exportación Agroalimentaria
                            </h2>
                            <p className="text-lg md:text-xl text-cyan-100 mb-8">
                                Facilitando el comercio bilateral Argentina - Chile a través del Paso de Jama
                            </p>
                            
                            {/* Iconos centrados en móvil, alineados a la izq en desktop */}
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 text-cyan-300">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Gestión Digital</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    <span>Proceso Ágil</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - LOGIN FORM */}
                        {/* CAMBIO 4: `mx-auto` centra en móvil, `md:ml-auto` empuja a derecha en desktop */}
                        < Login/>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;