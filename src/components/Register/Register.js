import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/button';
import './register.css'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSuccess('Usuário cadastrado com sucesso!');
                setTimeout(() => navigate('/'), 2000); // Redireciona para o login após 2 segundos
            })
            .catch((error) => {
                setError(`Erro ao cadastrar usuário: ${error.message}`);
            });
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <div className='card'>
            <h2>Dashboard<span>Acampa</span></h2>
            <h3>Coloque suas informações pra criar um novo usuário!</h3>
            <form onSubmit={handleSubmit} className="form">

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                {/* <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                /> */}
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
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <Button children="Criar Usuário" />
                <p>Já tem uma conta? <Link to="/">Clique aqui</Link></p>
            </form>

        </div>
    );
}
