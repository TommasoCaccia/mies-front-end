"use client";
import React, {useEffect, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import classes from '@/app/costi/page.module.css';
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

function DataEntry() {
    const [data, setData] = useState([]);
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterPotenza, setFilterPotenza] = useState('');
    const [filterClasse, setFilterClasse] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const PATH = 'localhost:8081';


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        try {
            const response = await fetch('http://91.108.112.165:8081/costi/upload', {
                method: 'POST',
                body: formData,
            });

            setMessage(response.ok ? 'File uploaded successfully!' : 'File upload failed.');
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error occurred during file upload.');
        }
    };

    useEffect(() => {
        setMessage('');
        const fetchCosti = async () => {
            try {
                const response = await fetch('http://91.108.112.165:8081/costi', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'}
                });

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error('Errore durante il fetch:', response.statusText);
                }
            } catch (error) {
                console.error('Errore di rete:', error);
            }
        };

        fetchCosti();
    }, []);

    const handleFilterCategoria = (e) => {
        setFilterCategoria(e.target.value);
        setFilterPotenza('');
        setFilterClasse('');
    };

    const handleFilterPotenza = (e) => {
        setFilterPotenza(e.target.value);
    };

    const handleFilterClasse = (e) => {
        setFilterClasse(e.target.value);
    };

    const filteredData = data.filter(costo => {
        return (!filterCategoria || costo.categoria === filterCategoria) &&
            (!filterPotenza || costo.tipoTensione === filterPotenza) &&
            (!filterClasse || costo.classeAgevolazione === filterClasse);
    });

    return (
        <div className={`${classes.container} container`}>
            <div className="mb-3 d-flex">
                <FormControl
                    as="select"
                    value={filterCategoria}
                    onChange={handleFilterCategoria}
                    className={classes.formUnitadimisura}
                >
                    <option value="">Filtra per Categoria</option>
                    <option value="dispacciamento">Dispacciamento</option>
                    <option value="trasporti">Trasporti</option>
                    <option value="penali">Penali</option>
                    <option value="oneri">Oneri</option>
                </FormControl>
                {filterCategoria === 'trasporti' && (
                    <FormControl
                        as="select"
                        value={filterPotenza}
                        onChange={handleFilterPotenza}
                        className="ml-3"
                        style={{marginLeft: '10px'}}
                    >
                        <option value="">Seleziona Intervallo Potenza</option>
                        <option value=">500KW">+500KW</option>
                        <option value="100-500KW">100-500KW</option>
                        <option value="<100KW">-100KW</option>
                    </FormControl>
                )}
                {filterCategoria === 'oneri' && (
                    <>
                        <FormControl
                            as="select"
                            value={filterPotenza}
                            onChange={handleFilterPotenza}
                            className="ml-3"
                            style={{marginLeft: '15px'}}
                        >
                            <option value="">Seleziona Intervallo Potenza</option>
                            <option value=">500KW">+500KW</option>
                            <option value="100-500KW">100-500KW</option>
                            <option value="<100KW">-100KW</option>
                        </FormControl>
                        <FormControl
                            as="select"
                            value={filterClasse}
                            onChange={handleFilterClasse}
                            className="ml-3"
                            style={{marginLeft: '15px'}}
                        >
                            <option value="">Seleziona Classe di Agevolazione</option>
                            <option value="Val">Val1</option>
                            <option value="Fat1">Fat1</option>
                            <option value="Fat2">Fat2</option>
                            <option value="Fat3">Fat3</option>
                            <option value="0">0</option>
                        </FormControl>
                    </>
                )}
            </div>
            <div>
                <Table className={classes.tabella}>
                    <TableHeader>
                        <TableColumn>Descrizione</TableColumn>
                        <TableColumn>Unità di Misura</TableColumn>
                        <TableColumn>Trimestre</TableColumn>
                        <TableColumn>Anno</TableColumn>
                        <TableColumn>Valore</TableColumn>
                        <TableColumn>Categoria</TableColumn>
                        <TableColumn>Intevallo di Potenza</TableColumn>
                        <TableColumn>Classe di agevolazione</TableColumn>
                        <TableColumn>Azioni</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {filteredData.map((costo, index) => (
                            <TableRow key={index}>
                                <TableCell>{costo.descrizione}</TableCell>
                                <TableCell>{costo.unitaMisura}</TableCell>
                                <TableCell>{costo.trimestre}</TableCell>
                                <TableCell>{costo.anno}</TableCell>
                                <TableCell>{costo.costo}</TableCell>
                                <TableCell>{costo.categoria}</TableCell>
                                <TableCell>{costo.intervalloPotenza}</TableCell>
                                <TableCell>{costo.classeAgevolazione}</TableCell>
                                <TableCell><Button variant="danger">Elimina</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className={classes.formContainer}>
                <h2 className={classes.h2}>Upload Excel File</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.fileInput}>
                        <label htmlFor="file-upload" className={classes.fileLabel}>
                            Scegli file
                        </label>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            accept=".xlsx,.xls"
                            id="file-upload"
                            className={classes.file}
                        />
                        <span className="fileName">{file ? file.name : 'Nessun file selezionato'}</span>
                    </div>
                    <button type="submit" className={classes.uploadButton}>UPLOAD</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
}

export default DataEntry;
