import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar Novo Usuário</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="submit">Cadastrar</button>
            <p>Já tem uma conta? <Link to="/">Clique aqui</Link></p>
        </form>
    );
}
