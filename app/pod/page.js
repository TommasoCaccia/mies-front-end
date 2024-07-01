"use client"
import {useEffect, useState} from 'react';
import axios from 'axios';
import classes from "@/app/pod/page.module.css";

export default function Pod() {
    const [country, setCountry] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [pods, setPods] = useState([]);


    //estrazione di tutti i pod
    useEffect(() => {
        const fetchPods = async () => {
            const response = await fetch('http://localhost:8080/pod/all', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPods(data);
            } else {
                const text = await response.text();
                console.error('Errore del server:', text);
                console.error('Errore durante il recupero dei pod');
            }
        }
        fetchPods();
    }, []);

    // Esempio di dati per i pod
    /*    const pods = [
            {id: 1, name: 'Pod 1',},
            {id: 2, name: 'Pod 2',},
            {id: 3, name: 'Pod 3',}
        ];*/

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Seleziona la bolletta da caricare');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Bolletta caricata con successo.');
        } catch (error) {
            console.error('Error uploading file', error);
            setMessage('Errore nel caricamento della bolletta.');
        }
        setUploading(false);
    };

    return (
        <div className={`${classes.container} container mt-5`}>
            <h1 className="mb-4 text-center">Carica la Bolletta</h1>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-white rounded">
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control"/>
                <button type="submit" disabled={uploading} className="btn btn-primary mt-3">
                    {uploading ? 'Caricamento in corso...' : 'Carica'}
                </button>
            </form>
            {message &&
                <p className={`alert ${uploading ? 'alert-danger' : 'alert-success'}`}>{message}</p>}
            <h2 className="text-center">Elenco dei Pod</h2>
            <table className="table table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Potenza Disponibile</th>
                    <th>Potenza Impegnata</th>
                    <th>Tensione di Alimentazione</th>
                </tr>
                </thead>
                <tbody>
                {pods.map(pod => (
                    <tr key={pod.id}>
                        <td>{pod.id}</td>
                        <td>{pod.potenza_Disponibile}</td>
                        <td>{pod.potenza_Impegnata}</td>
                        <td>{pod.tensione_Alimentazione}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
