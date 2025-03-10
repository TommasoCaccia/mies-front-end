"use client"
import {useEffect, useState} from 'react';
import classes from "@/app/pod/page.module.css";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";
import Swal from "sweetalert2";


//da inserire prima di mandare in produzione nelle fetch 91.108.112.165:8081

export default function Pod() {
    const [file, setFile] = useState(null);
    const [pods, setPods] = useState([]);
    const [isEditable, setIsEditable] = useState({});
    const [isModifica, setIsModifica] = useState({});

    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;

    const fetchPods = async () => {
        try {
            const response = await fetch(`${PATH_DEV}/pod`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                const data = await response.json();
                const editableStatus = {};
                const modificaIds = [];

                data.forEach(pod => {
                    editableStatus[pod.id] = {
                        sede: !pod.sede,
                        nazione: !pod.nazione
                    };

                    if (!pod.sede) pod.sede = '';
                    if (!pod.nazione) pod.nazione = '';

                    if (pod.sede && pod.nazione) {
                        modificaIds.push(pod.id);
                    }
                });

                setPods(data);
                setIsEditable(editableStatus);
                setIsModifica(modificaIds);
            }
        } catch
            (error) {
            console.log('Error during fetch:', error);
        }
    };

    useEffect(() => {
            fetchPods();
        }, []
    )
    ;


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica se è stato selezionato un file
        if (!file) {
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Seleziona un file da caricare'
            });
            return;
        }

        // Crea un FormData con il file caricato
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('fileData', file);

        try {
            // Effettua la richiesta al server
            const response = await fetch(`${PATH_DEV}/files/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            // Leggi il contenuto della risposta come testo
            const responseText = await response.text();

            if (response.ok) {
                // Mostra un messaggio di successo con il contenuto della risposta
                await Swal.fire({
                    icon: 'success',
                    title: 'Successo',
                    text: responseText || 'File caricato e processato con successo.'
                });

                // Reindirizzamento se necessario
                await fetchPods();
            } else {
                // Mostra il messaggio di errore dal server
                await Swal.fire({
                    icon: 'error',
                    title: 'Errore',
                    text: responseText || 'Errore durante il caricamento del file.'
                });
            }
        } catch (error) {
            // Gestione degli errori di rete o di esecuzione
            console.error("Errore nella richiesta:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Si è verificato un errore imprevisto. Riprova più tardi.'
            });
        }
    };


    const updatePod = async (podId) => {
        const podToUpdate = pods.find(pod => pod.id === podId);
        if (!podToUpdate) {
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Pod non trovato'
            });
            return;
        }

        try {
            const response = await fetch(`${PATH_DEV}/pod/sedeNazione`, {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idPod: podToUpdate.id,
                    sede: podToUpdate.sede,
                    nazione: podToUpdate.nazione
                })
            });

            if (response.ok) {
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    setPods(prevPods => prevPods.map(p => p.id === podId ? {...p, ...data} : p));
                } else {
                    setPods(prevPods => prevPods.map(p => p.id === podId ? podToUpdate : p));
                }

                setIsEditable(prev => ({
                    ...prev,
                    [podId]: {sede: false, nazione: false}
                }));
                setIsModifica(prev => [...prev, podId]);

                await Swal.fire({
                    icon: 'success',
                    title: 'Successo',
                    text: 'Pod aggiornato correttamente.'
                });

            } else {
                const errorText = await response.text();
                await Swal.fire({
                    icon: 'error',
                    title: 'Errore',
                    text: errorText || "Errore durante l'aggiornamento del pod"
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Errore di rete o imprevisto durante la richiesta.'
            });
        }
    };

    const handleUpdateClick = (podId) => {
        updatePod(podId);
    };


    const handleModificaClick = (podId) => {
        setIsEditable(prev => ({
            ...prev,
            [podId]: {sede: true, nazione: true}
        }));

        setIsModifica(prev => prev.filter(id => id !== podId));
    };


    const handleInputChange = (podId, field, value) => {
        setPods(prevPods =>
            prevPods.map(pod => {
                if (pod.id === podId) {
                    return {...pod, [field]: value};
                }
                return pod;
            }));
    };


    const handleViewBillsClick = () => {
        window.location.href = '/pod/bollette';
    };

    const updateSedeNazione = async (podId) => {
        const podToUpdate = pods.find(pod => pod.id === podId);
        if (!podToUpdate) {
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Pod non trovato'
            });
        }

        const response = await fetch(`${PATH_DEV}/pod/modifica-sede-nazione`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPod: podToUpdate.id,
                sede: podToUpdate.sede,
                nazione: podToUpdate.nazione
            })
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Successo',
                text: 'Sede e Nazione Modificate'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Errore durante la modifica della sede'
            })
        }
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.titoloBolletta}>Carica la Bolletta</h1>
            <form onSubmit={handleSubmit} className={classes.formBolletta}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control"/>
                <button type="submit" className={`btn btn-primary mt-3 ${classes.bottoneCarica}`}>
                    Carica
                </button>
            </form>
            <h2 className={`${classes.titoloPod} mb-4 text-center`}>Elenco dei Pod</h2>

            <div className={classes.tableContainer}>
                <div className={classes.scrollableTable}>
                    <Table className={classes.tabellaBolletta}>
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Potenza Disponibile</TableColumn>
                            <TableColumn>Potenza Impegnata</TableColumn>
                            <TableColumn>Tensione di Alimentazione</TableColumn>
                            <TableColumn>Sede</TableColumn>
                            <TableColumn>Nazione</TableColumn>
                            <TableColumn>Azioni</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>
                            {pods.map(pod => (
                                <TableRow key={pod.id}>
                                    <TableCell>{pod.id}</TableCell>
                                    <TableCell>{pod.potenzaDisponibile}</TableCell>
                                    <TableCell>{pod.potenzaImpegnata}</TableCell>
                                    <TableCell>{pod.tensioneAlimentazione}</TableCell>
                                    <TableCell>
                                        {isEditable[pod.id]?.sede ? (
                                            <input
                                                type="text"
                                                value={pod.sede}
                                                onChange={e => handleInputChange(pod.id, 'sede', e.target.value)}
                                            />
                                        ) : (
                                            pod.sede
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {isEditable[pod.id]?.nazione ? (
                                            <input
                                                type="text"
                                                value={pod.nazione}
                                                onChange={e => handleInputChange(pod.id, 'nazione', e.target.value)}
                                            />
                                        ) : (
                                            pod.nazione
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {isModifica.includes(pod.id) ? (
                                            <button onClick={() => handleModificaClick(pod.id)}>Modifica</button>
                                        ) : (
                                            <button onClick={() => handleUpdateClick(pod.id)}>Inserisci</button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <button onClick={handleViewBillsClick} className={classes.bottoneCarica}>
                Visualizza Bollette
            </button>
        </div>
    );
}
