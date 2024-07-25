'use client'
import classes from '@/app/page.module.css';
import HomeCarousel from '@/Components/carosello/carosello'
import {useEffect} from "react";

export default function Home() {

    const handleAccesso = async () => {
        const response = await fetch('http://localhost:8080/cliente', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if(data.loginEffettuato === 0){
                window.location.href = "/form-accesso";
            }
        } else {
            const text = await response.text();
            console.error('Errore durante il recupero dei dati:', text);
        }
    }

    useEffect(() => {
        handleAccesso();
    }, []);
    return (
        <main className={classes.main}>
            <HomeCarousel/>
            <section className="cta02 py-0">
                <div className="container">
                    <div className="row flex">
                        <div className={classes.primoParagrafo}>
                            <div className="testo">
                    <span className="titolo h2">
                        <strong className={classes.mies}>
                            Mies
                        </strong>
                    </span>
                                <p className={classes.Testo5}>
                                    MIES nasce da una innovativa idea imprenditoriale che pone al centro del suo operare
                                    soluzioni integrate e scalabili per la riduzione dei costi energetici e l’aumento
                                    della produttività aziendale attraverso la digitalizzazione del sistema Fabbrica,
                                    l’analisi dei dati e lo sviluppo della soluzione ottimale per l’Azienda Cliente.

                                    MIES le proprie competenze ingegneristiche ed il know how specifico di
                                    ottimizzazione dei processi aziendali con risultati certi e garantiti!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
