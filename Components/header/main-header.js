import Link from 'next/link';
import classes from './main-header.module.css'

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
                        <Link href="/" className={`${classes.link1} nav-link`}>Servizi</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" className={`${classes.link2} nav-link`}>Contatti</Link>
                    </li>
                    <div className="cta-wrapper  d-flex flex">
                        <a href="/login" className={`${classes.loginPulsante} btn`}>Login</a>
                    </div>
                </ul>
            </div>
        </header>
    );
}