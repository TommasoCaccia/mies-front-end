// pages/upload.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import classes from '@/app/upload-file/page.module.css'; // Importa CSS module per gli stili

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
            setMessage('Please select a file to upload.');
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
            setMessage('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file', error);
            setMessage('Error uploading file.');
        }
        setUploading(false);
    };

    return (
        <div className={classes.uploadContainer}>
            <h1>Upload a PDF File</h1>
            <form onSubmit={handleSubmit} className={classes.uploadForm}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className={classes.inputField}/>
                <button type="submit" disabled={uploading} className={classes.uploadButton}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {message && <p className={uploading ? classes.uploadingMessage : classes.message}>{message}</p>}
        </div>
    );
}