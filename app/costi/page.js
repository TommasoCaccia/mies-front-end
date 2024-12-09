"use client";
import React, {useEffect, useRef, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import classes from '@/app/costi/page.module.css';
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

export default function DataEntry() {
    const [data, setData] = useState([]);
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterPotenza, setFilterPotenza] = useState('');
    const [filterClasse, setFilterClasse] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null); // Indice della riga selezionata
    const [editRowData, setEditRowData] = useState({
        id: "",
        descrizione: "",
        unitaMisura: "",
        trimestre: "",
        anno: "",
        costo: "",
        categoria: "",
        intervalloPotenza: "",
        classeAgevolazione: "",
    });

    const formRef = useRef(null); // Riferimento al form


    const handleSelectRow = (index) => {
        setIsFormVisible(true)
        const rowData = filteredData[index];
        setSelectedIndex(index);
        setEditRowData({...rowData});
        // Scorri verso il form
        formRef.current.scrollIntoView({behavior: "smooth"});
    };

    const handleCancel = () => {
        setSelectedIndex(null);
        setIsFormVisible(false); // Nascondi il form quando si annulla
    };

    const handleSaveChanges = async () => {
        try {
            const updatedData = [...filteredData];
            updatedData[selectedIndex] = editRowData; // Update the selected row
            const response = await fetch("http://localhost:8080/costi/update", {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editRowData)
            });

            if (response.ok) {
                setSelectedIndex(null); // Exit edit mode
                setEditRowData({}); // Reset form data
                setIsFormVisible(false); // Hide the form after saving
                fetchCosti();
                window.location.href = '/costi';
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };


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
            const response = await fetch('http://localhost:8080/costi/upload', {
                method: 'POST',
                body: formData,
            });

            setMessage(response.ok ? 'File uploaded successfully!' : 'File upload failed.');
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error occurred during file upload.');
        }
    };

    const fetchCosti = async () => {
        try {
            const response = await fetch('http://localhost:8080/costi', {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok) {
                const data = await response.json();
                setData(data);
                console.log(data);
            } else {
                console.error('Errore durante il fetch:', response.statusText);
            }
        } catch (error) {
            console.error('Errore di rete:', error);
        }
    };

    const deleteCosto = async (id) => {
        const response = await fetch(`http://localhost:8080/costi/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            fetchCosti();
        } else {
            console.error('Errore durante il fetch:', response.statusText);
        }
    }

    useEffect(() => {
        setMessage('');
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
                        <TableColumn>N.riga</TableColumn>
                        <TableColumn>Descrizione</TableColumn>
                        <TableColumn>Unità di Misura</TableColumn>
                        <TableColumn>Trimestre</TableColumn>
                        <TableColumn>Anno</TableColumn>
                        <TableColumn>Valore</TableColumn>
                        <TableColumn>Categoria</TableColumn>
                        <TableColumn>Intevallo di Potenza</TableColumn>
                        <TableColumn>Classe di agevolazione</TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {filteredData.map((costo, index) => (
                            <TableRow key={index}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{costo.descrizione}</TableCell>
                                <TableCell>{costo.unitaMisura}</TableCell>
                                <TableCell>{costo.trimestre}</TableCell>
                                <TableCell>{costo.anno}</TableCell>
                                <TableCell>{costo.costo}</TableCell>
                                <TableCell>{costo.categoria}</TableCell>
                                <TableCell>{costo.intervalloPotenza}</TableCell>
                                <TableCell>{costo.classeAgevolazione}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleSelectRow(index)}>Modifica</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="danger"
                                            onClick={() => deleteCosto(costo.id)}>Elimina
                                    </Button>
                                </TableCell>
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
            {isFormVisible ? (
                <div ref={formRef} className={classes.containerFormModifica}>
                    {selectedIndex !== null && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveChanges();
                            }}
                        >
                            <label>
                                Descrizione:
                                <input
                                    type="text"
                                    value={editRowData.descrizione}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, descrizione: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Unità di Misura:
                                <input
                                    type="text"
                                    value={editRowData.unitaMisura}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, unitaMisura: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Trimestre:
                                <input
                                    type="text"
                                    value={editRowData.trimestre}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, trimestre: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Anno:
                                <input
                                    type="number"
                                    value={editRowData.anno}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, anno: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Valore:
                                <input
                                    type="number"
                                    value={editRowData.costo}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, costo: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Categoria:
                                <input
                                    type="text"
                                    value={editRowData.categoria}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, categoria: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Intervallo di Potenza:
                                <input
                                    type="text"
                                    value={editRowData.intervalloPotenza}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, intervalloPotenza: e.target.value})
                                    }
                                />
                            </label>
                            <label>
                                Classe di Agevolazione:
                                <input
                                    type="text"
                                    value={editRowData.classeAgevolazione}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, classeAgevolazione: e.target.value})
                                    }
                                />
                            </label>
                            <button type="submit">Salva modifiche</button>
                            <button type="button" onClick={handleCancel}>Annulla</button>
                        </form>
                    )}
                </div>
            ) : (
                <div ref={formRef}></div>
            )}


        </div>
    )
        ;
}