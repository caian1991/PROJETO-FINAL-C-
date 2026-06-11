
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useToast } from "../context/ToastContext";

import "./Login.css";

export const Login = () => {

    const [isRegister, setIsRegister] = useState(false);

    const [nome, setNome] = useState("");

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [loading, setLoading] = useState(false);

    const { login, register} = useAuth();

    const { showToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventdefault();

        if (!email || !senha || (isRegister && !nome)) {

            showToast(

                "Por favor, preencha os campos.",
                "error"

            );

            return;
            
        }

        setLoading(true);

        try {

            if (isRegister) {

                await register(nome, email, senha);

                showToast(

                    "Cadastro realizado com sucesso!",
                    "success"

                );
                
            } else {

                await login(email, senha);

                showToast(

                     "Cadastro realizado com sucesso!",
                    "success"

                );
     
            }

            navigate("/");
            
        } catch (error) {

            showToast(

                error.message ||
                "Ocorreu um erro ao processar sua solicitação.",
                "error"

            );
            
        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card glass">

                <div className="auth-header">

                    <div className="auth-logo">

                        Cine 
                        <span>Senai</span>

                    </div>

                    <p className="login-subtitle">

                        {
                            isRegister
                            ? "Crie sua conta para reservar ingressos"
                            : "Acesse suas contas para ver suas sessões"
                        }

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {isRegister && (

                        <div className="form-group">

                            <label htmlFor="nome">

                                Nome Completo

                            </label>

                            <input type="text" id="nome" className="form-control" placeholder="Ex: João Silva" value={nome} onChange={(e) => setNome(e.target.value)} disabled={loading} />

                        </div>

                    )}

                    <div className="form-group">

                        <label htmlFor="email">
                            
                            Email

                        </label>

                        <input id="email" type="email" className="form-control" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />

                    </div>

                     <div className="form-group">

                        <label htmlFor="senha">

                            Senha

                        </label>

                        <input id="senha" type="password" className="form-control" placeholder="........" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={loading} />

                    </div>

                    <button type="submit" className="btn btn-primary login-submit-btn" disabled={loading}>

                    </button>


                </form>

            </div>

        </div>
    )

}