// pages/upload.js
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
    const [file, setFile] = useState(null);
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

        const formData = new FormData();
        formData.append('fileName', file.name);
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
    };

    return (
        <div>
            <h1>Upload a PDF File</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
