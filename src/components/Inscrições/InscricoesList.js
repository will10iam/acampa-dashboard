import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './inscricoes.css';
import image from '../../assets/image.jpg'


export default function InscricoesList() {
    const [inscricoes, setInscricoes] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        const fetchInscricoes = async () => {
            const inscricoesCollection = collection(db, 'inscricoes');
            const inscricoesSnapshot = await getDocs(inscricoesCollection);
            const inscricoesData = inscricoesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInscricoes(inscricoesData);
            console.log(inscricoesData)
            const storedImages = JSON.parse(localStorage.getItem('inscricoesImages')) || {};
            setImages(storedImages);
        }
        fetchInscricoes();
    }, []);

    async function uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'acampamento');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/william1/image/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log('URL da imagem', data.secure_url);
            return data.secure_url;
        } catch (error) {
            console.log('Erro ao fazer o upload', error)
            throw error
        }
    };

    async function handleImageUpload(e, inscricaoId) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadImage(file);
            console.log('Imagem carregada:', imageUrl);

            setImages((prevImages) => {
                const updateImages = { ...prevImages, [inscricaoId]: imageUrl };
                localStorage.setItem('inscricoesImages', JSON.stringify(updateImages));
                return updateImages;
            })
        }
    }

    return (
        <div>
            <ul className='cardGeral'>
                {inscricoes.map(inscricao => (
                    <li key={inscricao.id} className='cardInscrito'>

                        <div className='cards'>
                            <div className="image-container">
                                <img src={images[inscricao.id] || image} alt="Foto do inscrito" className="image" />
                                <label htmlFor={`file-upload-${inscricao.id}`} className="upload-button">
                                    <i class="bi bi-upload"></i>
                                </label>
                                <input
                                    id={`file-upload-${inscricao.id}`}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageUpload(e, inscricao.id)}
                                />
                            </div>

                            <div>
                                <h2>{inscricao.name}</h2>
                                <h3>Pagamento: <span>{inscricao.payment}</span></h3>
                                <a href={`https://api.whatsapp.com/send?phone=${inscricao.phone}&text=Olá!%20Queria%20conversar%20sobre%20o%20Acampa2025.`} className="bn3637 bn37" target='_blank' rel='noreferrer'>Chamar no Whats!</a>
                                <button type="button" class="border-0" data-bs-toggle="modal" data-bs-target={`#modal-${inscricao.id}`}>
                                    Mais informações
                                </button>
                            </div>

                            <div class="modal fade" id={`modal-${inscricao.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`modal-label-${inscricao.id}`} aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title text-dark" id={`modal-label-${inscricao.id}`}>Informações do Acampante</h5>
                                            <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">X</button>
                                        </div>
                                        <div class="modal-body text-dark">
                                            Nome: {inscricao.name}<br></br>
                                            Documento: {inscricao.doc}<br></br>
                                            Aniversário: {inscricao.birthday}<br></br>
                                            Igreja: {inscricao.church}<br></br>
                                            Primeira vez que acampa com a gente?: {inscricao.firstTime}<br></br>
                                            Brinca em tudo?: {inscricao.pranks}<br></br>
                                            Alérgico a alimento?: {inscricao.allergic}<br></br>
                                            Alérgico a algum remédio?: {inscricao.remedy}<br></br>
                                            Precisa de transporte?: {inscricao.transport}<br></br>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="text-danger" data-bs-dismiss="modal">Fechar</button>
                                            <button type="button">
                                                <a href={`https://api.whatsapp.com/send?phone=${inscricao.phone}&text=Olá!%20Queria%20conversar%20sobre%20o%20Acampa2025.`}
                                                    target='_blank' rel='noreferrer' className='btn-modal'>Falar com Acampante!</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
