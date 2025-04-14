"use client";
import React, { useEffect, useState } from 'react';
import classes from "./page.module.css";
import Swal from "sweetalert2";

const ClienteProfilo = () => {
    const [infoUtente, setInfoUtente] = useState({});
    const [modificaCampo, setModificaCampo] = useState(null); // Campo da modificare
    const [nuovoDato, setNuovoDato] = useState(''); // Valore del nuovo dato
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;

    const logOut = async () => {
        const response = await fetch(`${PATH_DEV}/Autentication/logout`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
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
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const data = await response.json();
            setInfoUtente(data);
        }
    };

    const aggiornaDato = async (campo) => {
        const response = await fetch(`${PATH_DEV}/cliente/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [campo]: nuovoDato }),
        });
        if (response.ok) {
            setModificaCampo(null);
            setNuovoDato('');
            window.location.href = "/impostazioniUtente";
        } else {
            const text = await response.text();
            console.log('Errore durante l\'aggiornamento del dato:', text);
        }
    };

    useEffect(() => {
        getCliente();
    }, []);

    // Definizione degli array di campi per ciascuna sezione
    const sezione1 = ['username', 'password'];
    const sezione2 = ['telefono', 'email'];
    const sezione3 = ['pIva', 'sedeLegale', 'classeAgevolazione', 'codiceAteco', 'gassivori', 'energivori', 'consumoAnnuo', 'fatturatoAnnuo'];

    // Funzione per renderizzare il campo
    const renderField = (campo) => {
        const valore = infoUtente[campo];
        return (
            <div key={campo} className={classes.field}>
                <p>
                    <span>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</span>{" "}
                    {campo === 'password'
                        ? '********'
                        : (valore !== null && valore !== "" ? valore : 'Dato mancante')}
                </p>
                {(valore === null || valore === "") ? (
                    modificaCampo === campo ? (
                        <div className={classes.editField}>
                            {(campo === "energivori" || campo === "gassivori") ? (
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
                        {(campo === "energivori" || campo === "gassivori") ? (
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
        );
    };

    return (
        <div className={classes.container}>
            <title>Info Cliente</title>
            <h1>Informazioni Cliente</h1>

            <div className={classes.info}>
                {/* Raggruppa Sezione 1 e Sezione 2 in un div verticale */}
                <div className={classes.verticale}>
                    <div className={classes.sezione1}>
                        <h2>Credenziali</h2>
                        {sezione1.map(campo => renderField(campo))}
                    </div>
                    <div className={classes.sezione2}>
                        <h2>Dati Personali</h2>
                        {sezione2.map(campo => renderField(campo))}
                    </div>
                </div>
                {/* Sezione 3 in un div a parte */}
                <div className={classes.sezione3}>
                    <h2>Dati Aziendali</h2>
                    {sezione3.map(campo => renderField(campo))}
                </div>
            </div>

            <button className={classes.btnLogout} onClick={logOut}>
                Logout
            </button>
        </div>
    );
};

export default ClienteProfilo;
