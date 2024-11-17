import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './inscricoes.css';

export default function InscricoesList() {
    const [inscricoes, setInscricoes] = useState([]);

    useEffect(() => {
        const fetchInscricoes = async () => {
            const inscricoesCollection = collection(db, 'inscricoes');
            const inscricoesSnapshot = await getDocs(inscricoesCollection);
            const inscricoesData = inscricoesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInscricoes(inscricoesData);
        }
        fetchInscricoes();
    }, []);

    return (
        <div>
            <ul className='cardGeral'>
                {inscricoes.map(inscricao => (
                    <li key={inscricao.id} className='cardInscrito'>

                        <div>
                            <h2>{inscricao.name}</h2>
                            <h3>Pagamento: <span>{inscricao.payment}</span></h3>
                            <a href={`https://api.whatsapp.com/send?phone=${inscricao.phone}&text=Olá!%20Queria%20conversar%20sobre%20o%20Acampa2025.`} className="bn3637 bn37" target='_blank' rel='noreferrer'>Chamar no Whats!</a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
