
import React from 'react';
import InscricoesList from '../components/Inscrições/InscricoesList';
import logo from '../assets/logo.png'
import './dashboard.css'
export default function Dashboard() {



    return (
        <div>
            <div className='img'>
                <img src={logo} alt='' />
            </div>

            <div className='header'>
                <h2>Inscritos para o <span>Acampa2025</span></h2>
            </div>

            <InscricoesList />

        </div>
    );
}

