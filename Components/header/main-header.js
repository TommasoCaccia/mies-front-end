import Link from 'next/link';
import classes from '@/Components/header/main-header.module.css';


export default function MainHeader() {
    return (
        <header className={`${classes.Header} flex flex-wrap justify-content-between align-items-center w-100`}>
            <div className="container d-flex flex-wrap justify-content-between align-items-center">
                <Link href="/"
                      className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img src="/Logo.png" className={`${classes.logo} d-block`} alt="Logo"/>
                </Link>

                <ul className={`nav nav-pills ${classes.navItem}`}>
                    <li className={`nav-item ${classes.navItem}`}>
                        <Link href="/servizi" className={classes.link1}>Servizi</Link>
                    </li>
                    <li className={`nav-item ${classes.navItem}`}>
                        <Link href="/contatti" className={classes.link2}>Contatti</Link>
                    </li>
                    <li className={`nav-item dropdown ${classes.navDrop}`}>
                        <a className={`dropdown-toggle ${classes.link3}`} role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            Tools
                        </a>
                        <ul className={`dropdown-menu ${classes.dropMenu}`}>
                            <li className={classes.dropdownsubMenu}>
                                <a href="/energy-portfolio" className={`dropdown-toggle ${classes.energyPortfolio}`}
                                   role="button">
                                    Energy<br></br>Portfolio
                                </a>
                                <ul className={`dropdown-menu ${classes.dropMenuu}`}>
                                    <li><a href="/pod" className={classes.dropdownItem}>Carica Bolletta</a></li>
                                </ul>
                            </li>
                            <li><a href="/iso500001" className={classes.dropdownItem}>Iso 500001</a></li>
                            <li><a href="https://oneview.miesgroup.it/" className={classes.dropdownItem} target="_blank"
                                   rel="noopener noreferrer">Oneview</a></li>
                        </ul>
                    </li>
                    <li className={`nav-item dropdown ${classes.navDrop}`}>
                        <a className={`dropdown-toggle ${classes.link3}`} role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            Admin
                        </a>
                        <ul className={`dropdown-menu ${classes.dropMenu}`}>
                            <li><a href="/creazione-utente" className={classes.dropdownItem}>Creazione Utente</a></li>
                            <li><a href="/costi" className={classes.dropdownItem}>Costi</a></li>
                        </ul>
                    </li>
                    <div className="cta-wrapper d-flex flex">
                        <Link href="/login" className={classes.loginPulsante}>Login</Link>
                    </div>
                </ul>
            </div>
        </header>
    );
}
