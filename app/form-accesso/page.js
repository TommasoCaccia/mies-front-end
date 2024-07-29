"use client";
import React from 'react';
import classes from "@/app/form-accesso/page.module.css";

export default function Register() {

    const updateUtente = async (event) => {
        event.preventDefault(); // Prevenire il comportamento predefinito del form

        const sedeLegale = event.target.sedeLegale ? event.target.sedeLegale.value : null;
        const pIva = event.target.pIva ? event.target.pIva.value : null;
        const telefono = event.target.telefono ? event.target.telefono.value : null;
        const email = event.target.email ? event.target.email.value : null;
        const stato = event.target.stato ? event.target.stato.value : null;
        const classeAgevolazione = event.target.classeAgevolazione ? event.target.classeAgevolazione.value : null;

        const response = await fetch('http://localhost:8080/cliente/update', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sedeLegale,
                pIva,
                telefono,
                email,
                stato,
                classeAgevolazione
            })
        });

        if (response.ok) {
            window.location.href = "/";
        }else{}
    }

    return (
        <div className={`${classes.loginContainer} container`}>
            <h2 className={`active ${classes.titoloCreazioneUtente}`}>Info Utente</h2>
            <form onSubmit={updateUtente}>
                <div className={classes.formRow}>
                    <div className={`form-group ${classes.formSedeLegale}`}>
                        <input type="text" className={`form-control ${classes.sedeLegale}`} id="sedeLegale"
                               name="sedeLegale" required/>
                        <span className={classes.SedeLegale}>Sede Legale</span>
                    </div>
                    <div className={`form-group ${classes.formPIva}`}>
                        <input type="text" className={`form-control ${classes.pIva}`} id="pIva" name="pIva" required/>
                        <span className={classes.PIva}>P.IVA</span>
                    </div>
                </div>
                <div className={classes.formRow}>
                    <div className={`form-group ${classes.formEmail}`}>
                        <input type="email" className={`form-control ${classes.email}`} id="email" name="email"
                               required/>
                        <span className={classes.Email}>Email</span>
                    </div>
                    <div className={`form-group ${classes.formTelefono}`}>
                        <input type="tel" className={`form-control ${classes.telefono}`} id="telefono" name="telefono"
                               required/>
                        <span className={classes.Telefono}>Telefono</span>
                    </div>
                </div>
                <div className={classes.formRow}>
                    <div className={`form-group ${classes.formStato}`}>
                        <input type="text" className={`form-control ${classes.stato}`} id="stato" name="stato"
                               required/>
                        <span className={classes.Stato}>Stato</span>
                    </div>
                    <div className={`form-group ${classes.formClasseAgevolazione}`}>
                        <input type="text" className={`form-control ${classes.classeAgevolazione}`}
                               id="classeAgevolazione"
                               name="classeAgevolazione" required/>
                        <span className={classes.ClasseAgevolazione}>Classe di Agevolazione</span>
                    </div>
                </div>
                <button type="submit" className={`${classes.invia}`}>Invia</button>
            </form>
        </div>
    );
}