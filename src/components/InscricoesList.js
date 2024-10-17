import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

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
            <h2>Inscrições</h2>
            <ul>
                {inscricoes.map(inscricao => (
                    <li key={inscricao.id}>
                        {inscricao.name} - {inscricao.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}