"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import classes from "@/app/pod/bollette/page.module.css";

export default function Bollette() {
    const [data, setData] = useState([]);

    const downloadFile = async (id, name) => {
        try {
            const response = await axios.get(`http://localhost:8080/files/${id}/download`, {
                responseType: 'blob',
            });

            // Extract the filename from the Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : name;

            // Create a URL for the blob data
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element and simulate a click to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Use the exact filename from the server
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the link element and revoking the object URL
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };


    const getFiles = async () => {
        const id = localStorage.getItem('selectedPodId');
        try {
            const response = await fetch(`http://localhost:8080/pod/${id}/bollette`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    setData(data);
                } else {
                    console.error('Errore durante il recupero delle bollette: nessun dato ricevuto.');
                }
            } else {
                console.error(`Errore durante il recupero delle bollette: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Errore durante la chiamata fetch:', error);
        }
    };

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <div className={`container ${classes.container}`}>
            <table>
                <thead>
                <tr>
                    <th>Nome file</th>
                    <th>Download</th>
                </tr>
                </thead>
                <tbody>
                {data.map((file, index) => (
                    <tr key={index}>
                        <td>{file.file_Name}</td>
                        <td>
                            <button onClick={() => downloadFile(file.id_File, file.file_Name)}>Download</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
