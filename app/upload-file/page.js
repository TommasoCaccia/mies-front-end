// pages/upload.js
'use client';
import {useState} from 'react';
import axios from 'axios';
import classes from '@/app/upload-file/page.module.css';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

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
        formData.append('fileName', file.name);
        formData.append('fileData', file);

        try {
            // Ottieni il valore del cookie SESSION_COOKIE
            const sessionId = getSessionCookie(); // Implementa questa funzione per ottenere il valore del cookie SESSION_COOKIE

            const response = await fetch('http://localhost:8080/file', {
                method: 'POST',
                body: formData,
                headers: {
                    'SESSION_COOKIE': sessionId // Aggiungi il cookie alla richiesta
                }
            });

            if (!response.ok) {
                throw new Error('Errore nel caricamento del file');
            }

            const data = await response.text();
            setMessage('Bolletta caricata con successo: ' + data);
        } catch (error) {
            console.error('Error uploading file', error);
            setMessage('Errore nel caricamento della bolletta.');
        }
        setUploading(false);
    };

// Implementa questa funzione per ottenere il valore del cookie SESSION_COOKIE
    const getSessionCookie = () => {
        const name = 'SESSION_COOKIE=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };


    return (
        <div className={`${classes.uploadContainer} container my-5`}>
            <h1 className={`${classes.titoloBolletta} text-center mb-4`}>Carica la bolletta</h1>
            <form onSubmit={handleSubmit} className={`${classes.uploadForm} shadow p-3 mb-5 bg-white rounded`}>
                <input type="file" accept="application/pdf" onChange={handleFileChange}
                       className={`${classes.inputField} form-control`}/>
                <button type="submit" disabled={uploading} className={`${classes.uploadButton} btn btn-primary mt-3`}>
                    {uploading ? 'Caricamento in corso...' : 'Carica'}
                </button>
            </form>
            {message &&
                <p className={`${uploading ? classes.uploadingMessage : classes.message} alert ${uploading ? 'alert-danger' : 'alert-success'}`}>{message}</p>}
        </div>
    );
}
