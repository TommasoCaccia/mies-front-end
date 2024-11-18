"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import classes from "@/app/pod/bollette/page.module.css";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";


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

    const [id, setId] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedId = localStorage.getItem('selectedPodId');
            setId(storedId);
        }
    }, []);

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

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.tableContainer}>
                <div className={classes.scrollableTable}>
                    <Table className={classes.tabellaBolletta}>
                        <TableHeader>
                            <TableColumn>Nome file</TableColumn>
                            <TableColumn>Download</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell>{file.file_Name}</TableCell>
                                    <TableCell>
                                        <button onClick={() => downloadFile(file.id_File, file.file_Name)}>Download
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
