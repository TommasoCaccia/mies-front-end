"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import classes from "@/app/pod/bollette/page.module.css";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

export default function Bollette() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const downloadFile = async (id, name) => {
        try {
            const PATH = `localhost:8081`;
            const response = await axios.get(`http://localhost:8081/files/${id}/download`, {
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : name;

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };

    const getFiles = async () => {
        try {
            const response = await fetch(`http://${PATH}/pod/bollette`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setData(data);
            }
        } catch (error) {
            console.error('Errore durante la chiamata fetch:', error);
        }
    };

    useEffect(() => {
        getFiles();
    }, []);

    const filteredData = data.filter(file => file.id_pod.includes(searchTerm));

    const handleAddBillClick = () => {
        window.location.href = '/pod';
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Elenco Bollette</h1>
            <input
                type="text"
                placeholder="Cerca per ID POD"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={classes.searchBar}
            />
            <div className={classes.tableContainer}>
                <div className={classes.scrollableTable}>
                    <Table className={classes.tabellaBolletta}>
                        <TableHeader>
                            <TableColumn>Nome file</TableColumn>
                            <TableColumn>POD</TableColumn>
                            <TableColumn>Download</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell>{file.file_Name}</TableCell>
                                    <TableCell>{file.id_pod}</TableCell>
                                    <TableCell>
                                        <button onClick={() => downloadFile(file.id_File, file.file_Name)}>Download</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <button onClick={handleAddBillClick} className={classes.addBolletteButton}>
                Aggiungi Bolletta
            </button>
        </div>
    );
}