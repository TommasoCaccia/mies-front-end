"use client";
import classes from "@/app/creazione-utente/page.module.css";
import React from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon"

export default function Register() {

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const creaUtente = async () => {
        event.preventDefault();
        const username = event.target.username.value ? event.target.username.value : null;
        const password = event.target.password.value ? event.target.password.value : null;
        const response = await fetch("http://localhost:8080/Autentication/Register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            const data = await response;
        } else {
            const text = await response.text();
            console.error('Errore durante la creazione dell\'utente:', text);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.loginContainer}>
                <h2 className={`active ${classes.titoloCreazioneUtente}`}>Creazione Utente</h2>
                <form onSubmit={creaUtente}>
                    <div className={classes.inputContainer}>
                        <input type="email" id="email" required placeholder=" "/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={classes.inputContainer}>
                        <input
                            type={isVisible ? "text" : "password"}
                            placeholder=" "
                            id="password"
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
                </form>
            </div>
        </div>
    );
}