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
    const [priority, setPriority] = useState(true);
    const [costi, setCosti] = useState({
        f0: 0,
        f1: 0,
        f2: 0,
        f3: 0,
        f1_perdite: 0,
        f2_perdite: 0,
        f3_perdite: 0,
    });
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Se non è stato selezionato alcun file, mostra un alert
        if (!file) {
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Seleziona un file da caricare'
            });
            return;
        }

        // Imposta lo state di loading
        setIsLoading(true);

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

            const responseText = await response.text();

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Successo',
                    text: responseText || 'File caricato e processato con successo.'
                });
                // Esempio: puoi chiamare una funzione per aggiornare il contenuto, se necessario
                // await fetchPods();
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Errore',
                    text: responseText || 'Errore durante il caricamento del file.'
                });
            }
        } catch (error) {
            console.error("Errore nella richiesta:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Si è verificato un errore imprevisto. Riprova più tardi.'
            });
        } finally {
            // Al termine della richiesta, reinizializza lo state di loading
            setIsLoading(false);
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

    const fetchCostiCliente = async () => {
        try {
            const response = await fetch(`${PATH_DEV}/cliente/costi-energia`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Costi fetch:", data);

                // Definisci lo stato iniziale con tutti i costi a 0
                const costiState = {
                    f0: 0,
                    f1: 0,
                    f2: 0,
                    f3: 0,
                    f1_perdite: 0,
                    f2_perdite: 0,
                    f3_perdite: 0,
                };

                // Se la risposta è un array di oggetti, mappa ciascun oggetto al valore corrispondente
                data.forEach((item) => {
                    const key = item.nomeCosto;
                    if (key in costiState) {
                        costiState[key] = item.costoEuro;
                    }
                });

                // Aggiorna lo state con i costi trasformati
                setCosti(costiState);
                setLoading(false);
            } else {
                console.error("Errore nella fetch dei costi cliente");
                setLoading(false);
            }
        } catch (error) {
            console.error("Errore nella fetch:", error);
            setLoading(false);
        }
    };


    // Gestore per modificare i valori degli input
    const handleCostChange = (e) => {
        const {name, value} = e.target;
        setCosti((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleCostSubmit = async (event) => {
        event.preventDefault(); // Previene il comportamento predefinito del form

        // Converti lo state "costi" in un array di oggetti
        const costiArray = Object.keys(costi).map((key) => ({
            nomeCosto: key,
            costoEuro: costi[key],
        }));

        console.log("Invio costiArray:", costiArray); // Controlla in console che sia un array

        try {
            const response = await fetch(`${PATH_DEV}/cliente/costi-energia/add`, {
                method: 'POST',
                credentials: 'include', // Per inviare eventuali cookie di sessione
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(costiArray), // Invia l'array, non l'oggetto
            });

            if (!response.ok) {
                console.error("Errore nell'invio dei dati");
                return;
            }

            const data = await response.json();
            console.log("Dati inviati correttamente:", data);
            // Puoi aggiornare lo stato o notificare l'utente qui
        } catch (error) {
            console.error("Errore nella fetch:", error);
        }
    };


    if (loading) {
        return <p>Caricamento costi...</p>;
    }

    useEffect(() => {
            fetchPods();
            fetchCostiCliente();
            console.log(costi);
        }, []
    );
    return (
        <div className={classes.container}>
            <div className={classes.primoblocco}>
                <div>
                    <h1 className={classes.titoloBolletta}>Carica la Bolletta</h1>
                    <form onSubmit={handleSubmit} className={classes.formBolletta}>
                        <input type="file" accept="application/pdf" onChange={handleFileChange}
                               className="form-control"/>
                        <button
                            type="submit"
                            className={`btn btn-primary mt-3 ${classes.bottoneCarica}`}
                            disabled={isLoading}
                        >
                            {isLoading ? <span className={classes.spinner}></span> : "Carica"}
                        </button>
                    </form>
                </div>
                <div className={classes.costiContainer}>
                    <h2>Costi Materia Energia</h2>
                    <form onSubmit={handleCostSubmit} className={classes.costiForm}>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f0">F0:</label>
                            <input
                                type="number"
                                id="f0"
                                name="f0"
                                value={costi.f0}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f1">F1:</label>
                            <input
                                type="number"
                                id="f1"
                                name="f1"
                                value={costi.f1}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f2">F2:</label>
                            <input
                                type="number"
                                id="f2"
                                name="f2"
                                value={costi.f2}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f3">F3:</label>
                            <input
                                type="number"
                                id="f3"
                                name="f3"
                                value={costi.f3}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f1_perdite">F1 Perdite:</label>
                            <input
                                type="number"
                                id="f1_perdite"
                                name="f1_perdite"
                                value={costi.f1_perdite}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f2_perdite">F2 Perdite:</label>
                            <input
                                type="number"
                                id="f2_perdite"
                                name="f2_perdite"
                                value={costi.f2_perdite}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <div className={classes.inputGroup}>
                            <label htmlFor="f3_perdite">F3 Perdite:</label>
                            <input
                                type="number"
                                id="f3_perdite"
                                name="f3_perdite"
                                value={costi.f3_perdite}
                                onChange={handleCostChange}
                                className={classes.inputNumber}
                            />
                        </div>
                        <button type="submit" className={`btn btn-primary ${classes.submitButton}`}>
                            Salva Costi
                        </button>
                    </form>
                </div>
            </div>

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
                            <TableColumn>CAP</TableColumn>
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

                                    <TableCell>{pod.cap}</TableCell>
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