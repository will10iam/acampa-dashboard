import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import image from '../assets/image.jpg'
import './inscricoes.css'

export default function InscricoesList() {
    const [inscricoes, setInscricoes] = useState([]);

    useEffect(() => {
        const fetchInscricoes = async () => {
            const inscricoesCollection = collection(db, 'inscricoes');
            const inscricoesSnapshot = await getDocs(inscricoesCollection);
            const InscricoesList = inscricoesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInscricoes(InscricoesList);
        }
        fetchInscricoes();
    }, []);


    return (
        <div>
            <ul className='cardGeral'>
                {inscricoes.map(inscricao => (
                    <li key={inscricao.id} className='cardInscrito'>
                        <img src={image} alt="" />
                        <div>
                            <h2>{inscricao.name}</h2>
                            <h3>Pagamento: <span>{inscricao.payment}</span></h3>
                            <a href="/" class="bn3637 bn37">Entrar em Contato</a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}