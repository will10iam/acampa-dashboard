
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import InscricoesList from './InscricoesList';
import logo from '../assets/logo.png'

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/');
            }
        });
        return unsubscribe;
    }, [navigate]);

    function handleLogout(event) {
        event.preventDefault();
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

        </div>
    );
}

