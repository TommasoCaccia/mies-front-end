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

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link href="/" className={classes.link1}>Servizi</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" className={classes.link2}>Contatti</Link>
                    </li>
                    <li className={`nav-item dropdown ${classes.navItem}`}>
                        <a className={`dropdown-toggle ${classes.link3}`} role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            En. Portfolio
                        </a>
                        <ul className={`dropdown-menu ${classes.dropMenu}`}>
                            <li><Link href="/dashboard" className={classes.dropdownItem}>Dashboard</Link></li>
                            <li><Link href="/pod" className={classes.dropdownItem}>pod</Link></li>
                            <li><Link href="/dashboard/estero" className={classes.dropdownItem}>Estero</Link></li>
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
