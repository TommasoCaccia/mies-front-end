"use client"
import {useEffect, useState} from 'react';
import classes from "@/app/pod/page.module.css";
import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

export default function Pod() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [pods, setPods] = useState([]);
    const [isEditable, setIsEditable] = useState({});

    useEffect(() => {
        const fetchPods = async () => {
            try {
                const response = await fetch('http://localhost:8080/pod/all', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPods(data);

                    // Imposta i campi editabili se "sede" o "nazione" sono vuoti
                    const editableStatus = {};
                    data.forEach(pod => {
                        editableStatus[pod.id] = {
                            sede: !pod.sede,
                            nazione: !pod.nazione
                        };
                        if (!pod.sede) pod.sede = '';  // Inizializza con stringa vuota se undefined
                        if (!pod.nazione) pod.nazione = '';  // Inizializza con stringa vuota se undefined
                    });
                    setIsEditable(editableStatus);
                } else {
                    console.error('Fetch failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchPods();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Seleziona la bolletta da caricare');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('fileData', file);

        try {
            const response = await fetch('http://localhost:8080/files/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Errore nel caricamento del file');
            }
            const data = await response.text();
            setMessage('Bolletta caricata con successo: ' + data);
        } catch (error) {
            console.error('Error uploading file', error);
            setMessage('Errore nel caricamento della bolletta.');
        }
        setUploading(false);
        // window.location.href = '/pod';
    };


    const updatePod = async (podId) => {
        const podToUpdate = pods.find(pod => pod.id === podId);
        if (!podToUpdate) {
            console.error('Pod non trovato:', podId);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/pod/sedeNazione', {
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
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    setPods(prevPods => prevPods.map(p => p.id === podId ? {...p, ...data} : p));
                } else {
                    setPods(prevPods => prevPods.map(p => p.id === podId ? podToUpdate : p));
                }
                window.location.href = '/pod';
            } else {
                const text = await response.text();
                console.error('Errore del server:', text);
                console.error('Errore durante l\'aggiornamento del pod');
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del pod:', error);
        }
    };

    const handleUpdateClick = (podId) => {
        updatePod(podId);
    };

    const handleInputChange = (podId, field, value) => {
        setPods(prevPods => prevPods.map(pod => {
            if (pod.id === podId) {
                return {...pod, [field]: value};
            }
            return pod;
        }));
    };

    const handleViewBillsClick = () => {
        window.location.href = '/pod/bollette';
    };


    return (
        <div className={classes.container}>
            <h1 className={classes.titoloBolletta}>Carica la Bolletta</h1>
            <form onSubmit={handleSubmit} className={classes.formBolletta}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control"/>
                <button type="submit" disabled={uploading} className={`btn btn-primary mt-3 ${classes.bottoneCarica}`}>
                    {uploading ? 'Caricamento in corso...' : 'Carica'}
                </button>
            </form>
            {message &&
                <p className={`alert ${uploading ? 'alert-danger' : 'alert-success'}`}>{message}</p>}
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
                            <TableColumn>Bollette</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No rows to display."}>
                            {pods.map(pod => (
                                <TableRow key={pod.id}>
                                    <TableCell>{pod.id}</TableCell>
                                    <TableCell>{pod.potenza_Disponibile}</TableCell>
                                    <TableCell>{pod.potenza_Impegnata}</TableCell>
                                    <TableCell>{pod.tensione_Alimentazione}</TableCell>
                                    <TableCell>
                                        {isEditable[pod.id] && isEditable[pod.id].sede ? (
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
                                        {isEditable[pod.id] && isEditable[pod.id].nazione ? (
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
                                        {(!pod.sede || !pod.nazione) && (
                                            <button onClick={() => handleUpdateClick(pod.id)}>Inserisci</button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => handleViewBillsClick()}>Vedi bollette</button>
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
