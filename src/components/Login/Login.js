import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import './style.css'

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                props.setUser(userCredential.user);
                navigate('/dashboard');
            })
            .catch((error) => {
                setError('Login falhou, verifique suas credenciais');
            });
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="card">

            <h2>Dashboard<span>Acampa</span></h2>
            <h3>Coloque suas informações pra logar!</h3>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <div style={{ position: 'relative' }} className="form">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'relative',
                            right: -160,
                            top: -40,
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Entrar</button>
                <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link></p>
            </form>

        </div>
    );
}

