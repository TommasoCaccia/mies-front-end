"use client";
import React, {useEffect, useRef, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import classes from '@/app/costi/page.module.css';
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";
import Swal from "sweetalert2";
import ModalForm from "@/Components/ModalForm/modalForm";

export default function DataEntry() {
    // Stato per i dati e la paginazione
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const size = 50;
    const totalPages = data.totalePagine || 1;

    // Stati per i filtri (usati dal nuovo endpoint)
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterAnno, setFilterAnno] = useState('');
    const [filterAnnoRiferimento, setFilterAnnoRiferimento] = useState('');
    const [filterIntervalloPotenza, setFilterIntervalloPotenza] = useState('');

    // Altri stati
    const [file, setFile] = useState(null);
    const [ids, setIds] = useState([]);
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
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

    const formRef = useRef(null);

    // Per la navigazione della pagina (sezioni interne)
    const [activeSection, setActiveSection] = useState('section1');
    const [manualNavigation, setManualNavigation] = useState(false);
    const sectionRefs = useRef({
        section1: useRef(null),
        section2: useRef(null)
    });
    const sidebarRef = useRef(null);

    useEffect(() => {
        getCookie();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    if (!manualNavigation) {
                        setActiveSection(entry.target.id);
                        scrollToActiveLink(entry.target.id);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        Object.values(sectionRefs.current).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs.current).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [manualNavigation]);

    const scrollToActiveLink = (sectionId) => {
        const activeLink = sidebarRef.current?.querySelector(`.${classes.active}`);
        if (activeLink) {
            sidebarRef.current.scrollTop = activeLink.offsetTop - sidebarRef.current.offsetTop - 100;
        }
    };

    const getCookie = async () => {
        const response = await fetch(`${PATH_DEV}/session/extract-cookie`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            console.log("Cookie estratto con successo");
        } else {
            console.error("Errore durante l'estrazione del cookie");
        }
    };

    // Funzioni per upload, download, modifica ed eliminazione
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
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'costi.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                await Swal.fire({icon: 'success', text: 'Download dei dati avvenuto con successo'});
            } else {
                await Swal.fire({icon: 'error', text: 'Errore durante il download dei dati'});
            }
        } catch (error) {
            console.error('Errore durante il download:', error);
            await Swal.fire({icon: 'error', text: 'Si è verificato un errore imprevisto'});
        }
    };

    // Funzione per ottenere i costi filtrati dal backend (nuovo endpoint)
    const fetchCostiFiltrati = async (page = 0, size = 50) => {
        try {
            const params = new URLSearchParams();
            if (filterCategoria) params.append("categoria", filterCategoria);
            if (filterAnno) params.append("anno", filterAnno);
            if (filterAnnoRiferimento) params.append("annoRiferimento", filterAnnoRiferimento);
            if (filterIntervalloPotenza) params.append("intervalloPotenza", filterIntervalloPotenza);
            params.append("page", page);
            params.append("size", size);

            console.log(`${PATH_DEV}/costi/filtrati?${params.toString()}`);
            const response = await fetch(`${PATH_DEV}/costi/filtrati?${params.toString()}`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("Dati ricevuti:", responseData);
                setData(responseData);
            } else {
                console.error('Errore durante il fetch:', response.statusText);
            }
        } catch (error) {
            console.error('Errore durante il fetch dei costi filtrati:', error);
        }
    };

    useEffect(() => {
        fetchCostiFiltrati(page, size);
    }, [page, filterCategoria, filterAnno, filterAnnoRiferimento, filterIntervalloPotenza]);

    const confirmAndDeleteCosto = async (id) => {
        const result = await Swal.fire({
            title: "Sei sicuro?",
            text: "Questa operazione eliminerà il costo selezionato.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sì, elimina",
            cancelButtonText: "Annulla",
        });

        if (result.isConfirmed) {
            await deleteCosto(id);
        } else {
            Swal.fire({
                icon: "info",
                text: "Operazione annullata",
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    const deleteCosto = async (id) => {
        const response = await fetch(`${PATH_DEV}/costi/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            Swal.fire({
                icon: "success",
                text: "Eliminazione avvenuta con successo",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                fetchCostiFiltrati(page, size); // Richiama la funzione per ricaricare i costi
            });
        } else {
            await Swal.fire({
                icon: "error",
                text: "Errore durante l'eliminazione del costo"
            });
        }
    };

    const deleteCosti = async (ids) => {
        try {
            const response = await fetch(`${PATH_DEV}/costi/delete-ids`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(ids),
            });

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    text: "Errore durante l'eliminazione dei costi selezionati:" + response.statusText
                })
                console.error("Errore nell'eliminazione dei dati:", response.statusText);
                return null;
            }

            const data = await response.json();
            console.log("Costi eliminati:");
            await Swal.fire({
                icon: "success",
                text: "Costi eliminati con successo",
                timer: 2000, // Il messaggio scompare dopo 2 secondi
                showConfirmButton: false
            }).then(() => {
                fetchCostiFiltrati(page, size); // Richiama la funzione per ricaricare i costi
            });
            return data;
        } catch (error) {
            console.error("Errore nella fetch dei costi:", error);
        }
    };


    // Handlers per i nuovi filtri
    const handleFilterCategoria = (e) => {
        setFilterCategoria(e.target.value);
    };

    const handleFilterAnno = (e) => {
        setFilterAnno(e.target.value);
    };

    const handleFilterAnnoRiferimento = (e) => {
        setFilterAnnoRiferimento(e.target.value);
    };

    const handleFilterIntervalloPotenza = (e) => {
        setFilterIntervalloPotenza(e.target.value);
    };

    // Funzione per il toggle delle checkbox
    const handleToggleCheckbox = (id) => {
        if (ids.includes(id)) {
            setIds(ids.filter(selectedId => selectedId !== id));
        } else {
            setIds([...ids, id]);
        }
    };


    // Funzioni per il form di modifica
    const handleSelectRow = (index, id) => {
        setIsFormVisible(true);
        const rowData = filteredData[index];
        setSelectedIndex(index);
        setEditRowData({...rowData, id});
    };

    const handleCancel = () => {
        setSelectedIndex(null);
        setIsFormVisible(false);
    };

    const handleSaveChanges = async () => {
        const updatedData = [...filteredData];
        updatedData[selectedIndex] = editRowData;
        const response = await fetch(`${PATH_DEV}/costi/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editRowData)
        });
        if (response.ok) {
            setSelectedIndex(null);
            setEditRowData({});
            setIsFormVisible(false);
            Swal.fire({
                icon: "success",
                text: "Modifiche salvate con successo",
                timer: 2000, // Il messaggio scompare dopo 2 secondi
                showConfirmButton: false
            }).then(() => {
                fetchCostiFiltrati(page, size); // Richiama la funzione per ricaricare i costi
            });
        } else {
            await Swal.fire({
                icon: "error",
                text: "Errore durante il salvataggio delle modifiche"
            });
            console.log("modifiche: " + JSON.stringify(editRowData));
        }
    };

    // Per la paginazione dei dati, "filteredData" è preso da data.contenuto
    // Modifica: se data è un array, usalo direttamente, altrimenti cerca data.contenuto
    const filteredData = Array.isArray(data)
        ? data
        : data.contenuto || [];

    return (
        <div className={`${classes.container} container`}>
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
                    <button type="button" onClick={handleDownloadCosti} className={classes.uploadButton}>
                        Scarica Excel
                    </button>
                </form>
            </div>
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
                <FormControl
                    type="text"
                    placeholder="Filtra per Anno"
                    value={filterAnno}
                    onChange={handleFilterAnno}
                    className="ml-3"
                    style={{marginLeft: '10px'}}
                />
                <FormControl
                    type="text"
                    placeholder="Filtra per Anno di Riferimento"
                    value={filterAnnoRiferimento}
                    onChange={handleFilterAnnoRiferimento}
                    className="ml-3"
                    style={{marginLeft: '10px'}}
                />
                <FormControl
                    as="select"
                    value={filterIntervalloPotenza}
                    onChange={handleFilterIntervalloPotenza}
                    className="ml-3"
                    style={{marginLeft: '10px'}}
                >
                    <option value="">Filtra per Intervallo di Potenza</option>
                    <option value=">500KW">+500KW</option>
                    <option value="100-500KW">100-500KW</option>
                    <option value="<100KW">-100KW</option>
                </FormControl>
            </div>
            <div>
                <Table className={classes.tabella}>
                    <TableHeader>
                        <TableColumn>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setIds(filteredData.map(costo => costo.id));
                                    } else {
                                        setIds([]);
                                    }
                                }}
                                checked={filteredData.length > 0 && filteredData.every(costo => ids.includes(costo.id))}
                            />
                        </TableColumn>
                        <TableColumn>N.riga</TableColumn>
                        <TableColumn>Descrizione</TableColumn>
                        <TableColumn>Unità di Misura</TableColumn>
                        <TableColumn>Trimestre</TableColumn>
                        <TableColumn>Anno</TableColumn>
                        <TableColumn>Valore</TableColumn>
                        <TableColumn>Categoria</TableColumn>
                        <TableColumn>Intervallo di Potenza</TableColumn>
                        <TableColumn>Classe di agevolazione</TableColumn>
                        <TableColumn>Anno di riferimento</TableColumn>
                        <TableColumn></TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {filteredData.map((costo, index) => (
                            <TableRow key={costo.id}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={ids.includes(costo.id)}
                                        onChange={() => handleToggleCheckbox(costo.id)}
                                    />
                                </TableCell>
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
                                    <Button onClick={() => handleSelectRow(index, costo.id)}>Modifica</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="danger" onClick={() => confirmAndDeleteCosto(costo.id)}>
                                        Elimina
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div
                    style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
                        Precedente
                    </Button>
                    <span>Pagina {page + 1} di {totalPages}</span>
                    <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
                        Successiva
                    </Button>
                </div>
                <div style={{marginTop: '10px'}}>
                    <Button onClick={deleteCosti}>Invia Selezione</Button>
                </div>
            </div>
            <ModalForm
                isOpen={isFormVisible}
                selectedIndex={selectedIndex}
                editRowData={editRowData}
                setEditRowData={setEditRowData}
                handleSaveChanges={handleSaveChanges}
                handleCancel={handleCancel}
            />
        </div>
    );
}
