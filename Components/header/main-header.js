"use client";
import Link from 'next/link';
import classes from '@/Components/header/main-header.module.css';
import {useEffect, useState} from "react";
import Tools from "@/Components/header/tools/Tools";
import Admin from "@/Components/header/admin/admin";
import Image from "next/image";
import avatar from "@/public/avatar.png";

export default function MainHeader() {
    const [accessoEffetuato, setAccessoEffetuato] = useState(false);
    const [error, setError] = useState('');
    const [categoriaUtente, setCategoriaUtente] = useState('');
    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV;


    const checkAccesso = async () => {
        const response = await fetch(`${PATH_PRODUCTION}/Autentication/check`, {
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
        const response = await fetch(`${PATH_PRODUCTION}/Autentication/checkCategoria`, {
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


    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);

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
                                <Tools/>
                                {categoriaUtente === "Admin" && (
                                    <Admin/>
                                )}
                            </>
                        )}

                        {accessoEffetuato && (
                            <li className={`nav-item ${classes.navItem}`}>
                                <Link href="/impostazioniUtente" className={classes.link3}>
                                    <Image src={avatar} alt="avatar" className={classes.avatar}/>
                                </Link>
                            </li>
                        )}

                        {accessoEffetuato ? (
                            <></>
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