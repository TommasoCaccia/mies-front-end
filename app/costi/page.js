"use client";
import React, {useEffect, useRef, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import classes from '@/app/costi/page.module.css';
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";
import Swal from "sweetalert2";


export default function DataEntry() {
    const [data, setData] = useState([]);
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterPotenza, setFilterPotenza] = useState('');
    const [filterClasse, setFilterClasse] = useState('');
    const [file, setFile] = useState(null);
    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;

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
        annoRiferimento: "",
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


    const verificaEliminazione = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCosto(id);
                window.location.href = '/costi';
            }
        });
    }

    const handleCancel = () => {
        setSelectedIndex(null);
        setIsFormVisible(false); // Nascondi il form quando si annulla
    };

    const handleSaveChanges = async () => {
        const updatedData = [...filteredData];
        updatedData[selectedIndex] = editRowData; // Update the selected row
        const response = await fetch(`${PATH_DEV}/costi/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editRowData)
        });

        if (response.ok) {
            setSelectedIndex(null); // Exit edit mode
            setEditRowData({}); // Reset form data
            setIsFormVisible(false); // Hide the form after saving
            window.location.href = '/costi';
        } else {
            await Swal.fire({
                icon: "error",
                text: "Errore durante il salvataggio delle modifiche"
            });
        }

    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            await Swal.fire({
                icon: "error",
                text: "Seleziona un file da caricare",
            });
            return;
        }


        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);


        const response = await fetch(`${PATH_DEV}/costi/upload`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            await Swal.fire({
                icon: "success",
                text: "Upload dei dati avvenuto con successo",
            });
        } else {
            await Swal.fire({
                icon: "error",
                text: "Errore durante l'upload dei dati",
            });
        }

    };


    const handleDownloadCosti = async () => {
        try {
            const response = await fetch(`${PATH_DEV}/costi/downloadExcel`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            });

            if (response.ok) {
                // Converti la risposta in un blob
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                // Crea un collegamento temporaneo per il download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'costi.xlsx'); // Nome del file
                document.body.appendChild(link);
                link.click();

                // Rimuovi il collegamento temporaneo
                link.parentNode.removeChild(link);

                // Mostra il messaggio di successo
                await Swal.fire({
                    icon: 'success',
                    text: 'Download dei dati avvenuto con successo',
                });
            } else {
                // Mostra il messaggio di errore
                await Swal.fire({
                    icon: 'error',
                    text: 'Errore durante il download dei dati',
                });
            }
        } catch (error) {
            console.error('Errore durante il download:', error);
            await Swal.fire({
                icon: 'error',
                text: 'Si è verificato un errore imprevisto',
            });
        }
    };


    const fetchCosti = async () => {

        const response = await fetch(`${PATH_DEV}/costi`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            const data = await response.json();
            setData(data);
        } else {
            console.log('Errore durante il fetch:', response.statusText);
        }

    };

    const deleteCosto = async (id) => {
        const response = await fetch(`${PATH_DEV}/costi/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            await Swal.fire({
                icon: "success",
                text: "Costo eliminato con successo, ricarica la pagina per visualizzare i cambiamenti"
            });
        } else {
            await Swal.fire({
                icon: "error",
                text: "Errore durante l'eliminazione del costo"
            });

        }

    }

    useEffect(() => {
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
                        <TableColumn>Anno di riferimento</TableColumn>
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
                                <TableCell>{costo.annoRiferimento}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleSelectRow(index)}>Modifica</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="danger"
                                            onClick={() => verificaEliminazione(costo.id)}>Elimina
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
                    <button type="button" onClick={handleDownloadCosti} className={classes.uploadButton}>Scarica Excel
                    </button>

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
                            <label>
                                Anno di Riferimento:
                                <input
                                    type="text"
                                    value={editRowData.annoRiferimento}
                                    onChange={(e) =>
                                        setEditRowData({...editRowData, annoRiferimento: e.target.value})
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
    );
}