"use client"
import axios from "axios";
import {useState} from "react";

export default function bollette() {
    const id = localStorage.getItem('selectedPodId');
    const [data, setData] = useState([]);

    const downloadFile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/files/${id}/download`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'filename.pdf'); // nome del file scaricato
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };

    const getFiles = async () => {
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

    return (
        <div>
            <table>
                <thead>
                <th>Nome file</th>
                <th>Download</th>
                </thead>

                <tbody>
                {data.map((file, index) => (
                    <tr key={index}>
                        <td>{file.name}</td>
                        <td>
                            <button onClick={downloadFile}>Download</button>
                        </td>
                    </tr>
                ))
                }
                </tbody>

            </table>
        </div>
    );
}