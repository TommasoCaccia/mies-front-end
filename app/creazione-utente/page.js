"use client";
import classes from "@/app/creazione-utente/page.module.css";
import React from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon"

export default function Register() {

    const [isVisible, setIsVisible] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const PATH = 'localhost:8081';

    const toggleVisibility = () => setIsVisible(!isVisible);

    const creaUtente = async (event) => {
        event.preventDefault();
        const username = event.target.username.value ? event.target.username.value : null;
        const password = event.target.password.value ? event.target.password.value : null;
        const response = await fetch('http://' + PATH + '/Autentication/Register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            const data = await response;
            setMessage("Utente creato con successo");
        } else {
            setMessage("Errore nella creazione dell'utente");
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.loginContainer}>
                <h2 className={`active ${classes.titoloCreazioneUtente}`}>Creazione Utente</h2>
                <form onSubmit={creaUtente}>
                    <div className={classes.inputContainer}>
                        <input type="text" id="username" name="username" required placeholder=" "/>
                        <label htmlFor="username">UserName</label>
                    </div>
                    <div className={classes.inputContainer}>
                        <input
                            type={isVisible ? "text" : "password"}
                            placeholder=" "
                            id="password"
                            name="password"
                            className={classes.passwordInput}
                            required
                        />
                        <label htmlFor="password" className={classes.inputLabel}>Password</label>
                        <button
                            className={classes.visibilitytoggle}
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon/>
                            ) : (
                                <EyeFilledIcon/>
                            )}
                        </button>
                    </div>
                    <button type="submit" className={classes.creaUtente}>Crea Utente</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
}