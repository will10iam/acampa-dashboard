
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import InscricoesList from './InscricoesList';

export default function Dashboard() {
    const navigate = useNavigate();

    function handleLogout() {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.error('Logout falhou', error);
        });
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <InscricoesList />
            <button onClick={handleLogout}>Sair</button>
            {/* Adicione mais funcionalidades do dashboard aqui */}
        </div>
    );
}

