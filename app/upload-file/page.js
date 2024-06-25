// pages/upload.js
'use client';
import { useState, useRef } from 'react';
import axios from 'axios';
import classes from '@/app/upload-file/page.module.css'; // Import CSS module for styles

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null); // Riferimento all'input del file

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const resetInputFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Resetta il valore dell'input file
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
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
            setMessage('File uploaded successfully.');
            resetInputFile(); // Chiama la funzione per resettare l'input del file
            setFile(null);
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
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className={classes.inputField}/>
                <button type="submit" disabled={uploading} className={classes.uploadButton}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {message && <p className={uploading ? classes.uploadingMessage : classes.message}>{message}</p>}
        </div>
    );
}
