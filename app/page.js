'use client'
import classes from '@/app/page.module.css';
import HomeCarousel from '@/Components/carosello/carosello'
import  traiding from '@/public/icon/trading.svg'
import expensive from '@/public/icon/expensive.svg'
import  receipt from '@/public/icon/receipt.svg'
import problemSolving from '@/public/icon/problem-solving.svg'
import confrontation from '@/public/icon/confrontation.svg'
import refund from '@/public/icon/refund.svg'
import Image from "next/image";

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
            <section>
                <div className={classes.menuRapido}>
                    <h2 className={classes.mainTitle}>Controllo fatture energetiche</h2>

                    <div className={classes.sectionContainer}>
                        {/* Sezione MONITORA */}
                        <div className={classes.section}>
                            <h3 className={classes.sectionTitle}>MONITORA</h3>
                            <div className={classes.iconRow}>
                                <div className={classes.iconCard}>
                                    <Image src={traiding} alt="Icona consumi" />
                                    <p>Consumi</p>
                                </div>
                                <div className={classes.iconCard}>
                                    <Image src={expensive} alt="Icona costi energetici" />
                                    <p>Costi energetici</p>
                                </div>
                                <div className={classes.iconCard}>
                                    <Image src={receipt} alt="Icona spesa" />
                                    <p>Spesa</p>
                                </div>
                            </div>
                        </div>

                        {/* Sezione RISULTATO */}
                        <div className={classes.section}>
                            <h3 className={classes.sectionTitle}>RISULTATO</h3>
                            <div className={classes.iconRow}>
                                <div className={classes.iconCard}>
                                    {/* Sostituisci con la tua icona */}
                                    <Image src={problemSolving} alt="Icona individuazione errori" />
                                    <p>Individuazione errori</p>
                                </div>
                                <div className={classes.iconCard}>
                                    {/* Sostituisci con la tua icona */}
                                    <Image src={confrontation} alt="Icona correzione" />
                                    <p>Correzione col fornitore</p>
                                </div>
                                <div className={classes.iconCard}>
                                    {/* Sostituisci con la tua icona */}
                                    <Image src={refund} alt="Icona recupero" />
                                    <p>Recupero</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
