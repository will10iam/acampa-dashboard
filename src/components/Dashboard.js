
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import InscricoesList from './InscricoesList';
import logo from '../assets/logo.png'

export default function Dashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    function handleLogout(event) {
        event.preventDefault();
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.error('Logout falhou', error);
        });
    }

    if (loading) return <div>Carregando...</div>

    return (
        <div>
            <div className='img'>
                <img src={logo} alt='' />
            </div>

            <div className='header'>
                <h2>Inscritos para o <span>Acampa2025</span></h2>
                <button onClick={handleLogout}>Sair</button>
            </div>

            <InscricoesList />

        </div>
    );
}

