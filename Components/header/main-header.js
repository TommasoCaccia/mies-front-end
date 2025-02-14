"use client";
import Link from 'next/link';
import classes from '@/Components/header/main-header.module.css';
import {useEffect, useState} from "react";
import Image from "next/image";
import avatar from "@/public/avatar.png";

export default function MainHeader() {
    const [accessoEffetuato, setAccessoEffetuato] = useState(false);
    const [error, setError] = useState('');
    const [categoriaUtente, setCategoriaUtente] = useState('');
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;

    const checkAccesso = async () => {
        try {
            const response = await fetch(`${PATH_PRODUCTION}/Autentication/check`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                setAccessoEffetuato(true);
            } else {
                setError("Errore durante il controllo dell'accesso");
            }
        } catch (error) {
            setError("Errore di rete");
        }
    };

    const checkCategoria = async () => {
        try {
            const response = await fetch(`${PATH_PRODUCTION}/Autentication/checkCategoria`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok) {
                const data = await response.json();
                setCategoriaUtente(data.tipologia);
            } else {
                setError("Errore durante il controllo della categoria");
            }
        } catch (error) {
            setError("Errore di rete");
        }

    };

    useEffect(() => {
        checkAccesso();
        checkCategoria();
        console.log(categoriaUtente);
    }, []);

    return (
        <header className={classes.header}>
            <Link href="/" className={classes.logoContainer}>
                <img src="/Logo.png" className={classes.logo} alt="Logo"/>
            </Link>

            <input className={classes.menuBtn} type="checkbox" id="menuBtn"/>
            <label className={classes.menuIcon} htmlFor="menuBtn"><span className={classes.navIcon}></span></label>

            <ul className={classes.menu}>
                <Link href="/" className={classes.logoContainerElenco}>
                    <img src="/Logo.png" className={classes.logoElenco} alt="Logo"/>
                </Link>
                <li>
                    <Link href="/servizi">Servizi</Link>
                </li>
                <li>
                    <Link href="/contatti">Contatti</Link>
                </li>
                {accessoEffetuato && (
                    <>
                        <li>
                            <Link href="/energy-portfolio">Energy Portfolio</Link>
                        </li>
                        <li>
                            <Link href="/pod/bollette">Bollette</Link>
                        </li>
                        {categoriaUtente === "Admin" && (
                            <>
                                <li>
                                    <Link href="/creazione-utente">Creazione Utente</Link>
                                </li>
                                <li>
                                    <Link href="/costi">Costi</Link>
                                </li>
                            </>
                        )}
                    </>
                )}
                {accessoEffetuato && (
                    <li>
                        <Link href="/impostazioniUtente">
                            <Image src={avatar} alt="avatar" className={classes.avatar}/>
                        </Link>
                    </li>
                )}
                {!accessoEffetuato && (
                    <div className={classes.loginContainer}>
                        <Link href="/login" className={classes.loginPulsante}>Login</Link>
                    </div>
                )}
            </ul>
        </header>
    );
}
