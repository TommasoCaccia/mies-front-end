'use client'
import classes from '@/app/page.module.css';
import HomeCarousel from '@/Components/carosello/carosello'

export default function Home() {
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
