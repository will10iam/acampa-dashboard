
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import InscricoesList from './InscricoesList';
import logo from '../assets/logo.png'

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
            <div className='img'>
                <img src={logo} alt='' />
            </div>

            <div className='header'>
                <h2>Inscritos para o <span>Acampa2025</span></h2>
                <button onClick={handleLogout}>Sair</button>
            </div>

            <InscricoesList />

            {/* Adicione mais funcionalidades do dashboard aqui */}
        </div>
    );
}

