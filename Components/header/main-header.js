"use client";
import Link from 'next/link';
import classes from '@/Components/header/main-header.module.css';
import {useEffect, useState} from "react";
import Tools from "@/Components/header/tools/Tools";
import Admin from "@/Components/header/admin/admin";

export default function MainHeader() {
    const [accessoEffetuato, setAccessoEffetuato] = useState(false);
    const [error, setError] = useState('');
    const [categoriaUtente, setCategoriaUtente] = useState('');


    const checkAccesso = async () => {
        const response = await fetch('http://localhost:8080/Autentication/check', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setAccessoEffetuato(true);
        } else {
            setError('errore durante il controllo dell\'accesso');
        }
    }

    const checkCategoria = async () => {
        const response = await fetch('http://localhost:8080/Autentication/checkCategoria', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            setCategoriaUtente(data.tipologia);
        } else {
            setError('errore durante il controllo dell\'accesso');
        }
    }

    console.log('Categoria utente:', categoriaUtente);

    console.log('Accesso effettuato   ' + accessoEffetuato);


    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/Autentication/logout', {
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
            console.error('Errore durante il logout:', text);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);

        // Toggle active class on hamburger button
        const hamburgerButton = document.querySelector(`.${classes.hamburger}`);
        if (hamburgerButton) {
            hamburgerButton.classList.toggle(classes.active);
        }
    };


    useEffect(() => {
        checkAccesso();
        checkCategoria();
    }, []);

    return (
        <header className={`${classes.Header} flex flex-wrap justify-content-between align-items-center w-100`}>
            <div className="container d-flex flex-wrap justify-content-between align-items-center">
                <Link href="/"
                      className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img src="/Logo.png" className={`${classes.logo} d-block`} alt="Logo"/>
                </Link>

                <button className={`${classes.hamburger}`} onClick={handleToggle}>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                </button>

                <nav className={`${classes.nav} ${isOpen ? classes.show : ''}`}>
                    <ul className={`nav nav-pills ${classes.navItem}`}>
                        <li className={`nav-item ${classes.navItem}`}>
                            <Link href="/servizi" className={classes.link1}>Servizi</Link>
                        </li>
                        <li className={`nav-item ${classes.navItem}`}>
                            <Link href="/contatti" className={classes.link2}>Contatti</Link>
                        </li>
                        {accessoEffetuato && (
                            <>
                                {/* Dropdown Tools */}
                                <Tools/>
                                {/* Dropdown Admin */}
                                {categoriaUtente === "Admin" && (<>
                                        <Admin/>
                                    </>
                                )}
                            </>
                        )}
                        {accessoEffetuato ? (
                            <li className={`nav-item ${classes.navItem}`}>
                                <button onClick={handleLogout} className={classes.logoutPulsante}>Logout</button>
                            </li>
                        ) : (
                            <div className="cta-wrapper d-flex flex">
                                <Link href="/login" className={classes.loginPulsante}>Login</Link>
                            </div>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}