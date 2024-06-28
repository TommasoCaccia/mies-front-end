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
        formData.append('fileName',file.name)
        formData.append('fileData', file);
        try {
            const response = await axios.post('http://localhost:8080/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Bolletta caricata con successo.');
        } catch (error) {
            console.error('Error uploading file', error);
            setMessage('Errore nel caricamente della bolletta.');
        }
        setUploading(false);
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
