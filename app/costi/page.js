"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import classes from '@/app/costi/page.module.css';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import Swal from "sweetalert2";

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
    const [selectedIds, setSelectedIds] = useState([]);
    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
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
    const [isOpen, setIsOpen] = useState(false);

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

    const handleNavigation = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
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
                await Swal.fire({ icon: 'success', text: 'Download dei dati avvenuto con successo' });
            } else {
                await Swal.fire({ icon: 'error', text: 'Errore durante il download dei dati' });
            }
        } catch (error) {
            console.error('Errore durante il download:', error);
            await Swal.fire({ icon: 'error', text: 'Si è verificato un errore imprevisto' });
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
                headers: { 'Content-Type': 'application/json' }
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

    const deleteCosto = async (id) => {
        const response = await fetch(`${PATH_DEV}/costi/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
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
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Funzione per inviare gli id selezionati
    const handleSubmitSelected = async () => {
        try {
            const response = await fetch('/api/submit-ids', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedIds),
            });
            if (!response.ok) {
                console.error("Errore nell'invio dei dati");
                return;
            }
            const result = await response.json();
            console.log("Dati inviati correttamente:", result);
        } catch (error) {
            console.error("Errore nella fetch:", error);
        }
    };

    // Funzioni per il form di modifica
    const handleSelectRow = (index) => {
        setIsFormVisible(true);
        const rowData = filteredData[index];
        setSelectedIndex(index);
        setEditRowData({ ...rowData });
        formRef.current.scrollIntoView({ behavior: "smooth" });
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editRowData)
        });
        if (response.ok) {
            setSelectedIndex(null);
            setEditRowData({});
            setIsFormVisible(false);
            window.location.href = '/costi';
        } else {
            await Swal.fire({
                icon: "error",
                text: "Errore durante il salvataggio delle modifiche"
            });
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
                    style={{ marginLeft: '10px' }}
                />
                <FormControl
                    type="text"
                    placeholder="Filtra per Anno di Riferimento"
                    value={filterAnnoRiferimento}
                    onChange={handleFilterAnnoRiferimento}
                    className="ml-3"
                    style={{ marginLeft: '10px' }}
                />
                <FormControl
                    as="select"
                    value={filterIntervalloPotenza}
                    onChange={handleFilterIntervalloPotenza}
                    className="ml-3"
                    style={{ marginLeft: '10px' }}
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
                                        setSelectedIds(filteredData.map(costo => costo.id));
                                    } else {
                                        setSelectedIds([]);
                                    }
                                }}
                                checked={filteredData.length > 0 && filteredData.every(costo => selectedIds.includes(costo.id))}
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
                                        checked={selectedIds.includes(costo.id)}
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
                                    <Button onClick={() => handleSelectRow(index)}>Modifica</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="danger" onClick={() => verificaEliminazione(costo.id)}>
                                        Elimina
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
                        Precedente
                    </Button>
                    <span>Pagina {page + 1} di {totalPages}</span>
                    <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
                        Successiva
                    </Button>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={handleSubmitSelected}>Invia Selezione</Button>
                </div>
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
                                        setEditRowData({ ...editRowData, descrizione: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Unità di Misura:
                                <input
                                    type="text"
                                    value={editRowData.unitaMisura}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, unitaMisura: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Trimestre:
                                <input
                                    type="text"
                                    value={editRowData.trimestre}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, trimestre: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Anno:
                                <input
                                    type="number"
                                    value={editRowData.anno}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, anno: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Valore:
                                <input
                                    type="number"
                                    value={editRowData.costo}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, costo: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Categoria:
                                <input
                                    type="text"
                                    value={editRowData.categoria}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, categoria: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Intervallo di Potenza:
                                <input
                                    type="text"
                                    value={editRowData.intervalloPotenza}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, intervalloPotenza: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Classe di Agevolazione:
                                <input
                                    type="text"
                                    value={editRowData.classeAgevolazione}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, classeAgevolazione: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Anno di Riferimento:
                                <input
                                    type="text"
                                    value={editRowData.annoRiferimento}
                                    onChange={(e) =>
                                        setEditRowData({ ...editRowData, annoRiferimento: e.target.value })
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
