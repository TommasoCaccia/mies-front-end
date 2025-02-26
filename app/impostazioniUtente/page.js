"use client";

import React, {useState, useEffect} from 'react';
import classes from "./page.module.css"

const ClienteProfilo = () => {
    const [infoUtente, setInfoUtente] = useState({});
    const [modificaCampo, setModificaCampo] = useState(null); // Campo da modificare
    const [nuovoDato, setNuovoDato] = useState(''); // Valore del nuovo dato
    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV

    const logOut = async () => {
        const response = await fetch(`${PATH_DEV}/Autentication/logout`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            window.location.href = "/";
        } else {
            const text = await response.text();
            console.log('Errore durante il logout:', text);
        }
    };

    const getCliente = async () => {
        const response = await fetch(`${PATH_DEV}/cliente`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            setInfoUtente(data);
        }
    };

    const aggiornaDato = async () => {
        const response = await fetch(`${PATH_DEV}/cliente/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({[modificaCampo]: nuovoDato}),
        });
        if (response.ok) {
            setModificaCampo(null);
            setNuovoDato('');
            window.location.href = "/impostazioniUtente";
        } else {
            const text = await response.text();
            console.log('Errore durante l\'aggiornamento del dato:', text);
        }
    }

    useEffect(() => {
        getCliente();
    }, []);


    return (
        <div className={classes.container}>
            <title>Info Cliente</title>
            <h1>Informazioni Cliente</h1>
            <div className={classes.info}>
                {[
                    'username',
                    'password',
                    'sedeLegale',
                    'pIva',
                    'email',
                    'telefono',
                    'stato',
                    'classeAgevolazione',
                    'codiceAteco',
                    'energivori',
                    'gassivori',
                    'consumoAnnuo',
                    'fatturatoAnnuo'
                ].map((campo) => (
                    <div key={campo} className={classes.field}>
                        <p>
                            <span>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</span>{" "}
                            {campo === 'password' ? '********' : (infoUtente[campo] || 'Dato mancante')}
                        </p>
                        {infoUtente[campo] === null || infoUtente[campo] === "" ? (
                            modificaCampo === campo ? (
                                <div className={classes.editField}>
                                    {campo === "energivori" || campo === "gassivori" ? (
                                        <div className={classes.checkboxContainer}>
                                            <input
                                                type="checkbox"
                                                checked={nuovoDato === "true"}
                                                onChange={(e) => setNuovoDato(e.target.checked ? "true" : "false")}
                                                className={classes.customCheckbox}
                                            />
                                            <label className={classes.checkboxLabel}>
                                                {campo.charAt(0).toUpperCase() + campo.slice(1)}
                                            </label>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder={`Inserisci ${campo}`}
                                            value={nuovoDato}
                                            onChange={(e) => setNuovoDato(e.target.value)}
                                        />
                                    )}
                                    <button onClick={() => aggiornaDato(campo)}>Salva</button>
                                    <button onClick={() => setModificaCampo(null)}>Annulla</button>
                                </div>
                            ) : (
                                <button className={classes.modifyButton} onClick={() => setModificaCampo(campo)}>
                                    Aggiungi
                                </button>
                            )
                        ) : modificaCampo === campo ? (
                            <div className={classes.editField}>
                                {campo === "energivori" || campo === "gassivori" ? (
                                    <div className={classes.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            checked={nuovoDato === "true"}
                                            onChange={(e) => setNuovoDato(e.target.checked ? "true" : "false")}
                                            className={classes.customCheckbox}
                                        />
                                        <label className={classes.checkboxLabel}>
                                            {campo.charAt(0).toUpperCase() + campo.slice(1)}
                                        </label>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={`Modifica ${campo}`}
                                        value={nuovoDato}
                                        onChange={(e) => setNuovoDato(e.target.value)}
                                    />
                                )}
                                <div className={classes.buttons}>
                                    <button onClick={() => aggiornaDato(campo)}>Salva</button>
                                    <button onClick={() => setModificaCampo(null)}>Annulla</button>
                                </div>
                            </div>
                        ) : (
                            <button className={classes.modifyButton} onClick={() => setModificaCampo(campo)}>
                                Modifica
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button className={classes.btnLogout} onClick={logOut}>
                Logout
            </button>
        </div>


    );
};

export default ClienteProfilo;
