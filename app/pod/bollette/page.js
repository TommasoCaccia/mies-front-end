"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import classes from "@/app/pod/bollette/page.module.css";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";
import swal from "sweetalert2";

export default function Bollette() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pod, setPod] = useState([]);
    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;


    const downloadFile = async (id, name) => {

        try {
            const response = await axios.get(`${PATH_PRODUCTION}/files/${id}/download`, {
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
            console.log('Error downloading file', error);
        }
    };

    const getPod = async () => {
        const response = await fetch(`${PATH_PRODUCTION}/pod`, {
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json'}

        })

        if (response.ok) {
            const data = await response.json();
            setPod(data);
        } else {
            swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Errore durante il recupero dei POD'
            });
        }
    }


    const getFiles = async () => {
        try {
            const response = await fetch(`${PATH_PRODUCTION}/pod/bollette`, {
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
            console.log('Errore durante la chiamata fetch:', error);
        }
    };

    useEffect(() => {
        getFiles();
        getPod();
    }, []);

    const filteredData = data.filter(file => file.idPod.includes(searchTerm));

    const handleAddBillClick = () => {
        window.location.href = '/pod';
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Elenco Bollette</h1>
            <div className={classes.searchContainer}>
                <label htmlFor="pod-select" className={classes.label}>
                    Seleziona un ID POD:
                </label>
                <select
                    id="pod-select"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={classes.searchBar}
                >
                    <option value="">Seleziona un POD</option>
                    {pod.map((pod) => (
                        <option key={pod.id} value={pod.id}>
                            {pod.id}
                        </option>
                    ))}
                </select>
            </div>
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
                                    <TableCell>{file.fileName}</TableCell>
                                    <TableCell>{file.idPod}</TableCell>
                                    <TableCell>
                                        <button onClick={() => downloadFile(file.idFile, file.fileName)}>Download
                                        </button>
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