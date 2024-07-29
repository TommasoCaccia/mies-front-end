import classes from '@/app/servizi/iso500001/page.module.css';

export default function Iso500001() {
    return (
        <>
            <div className={`container ${classes.container}`}>
                <img src="/ISO50001.jpg" className={`${classes.imgDiagnosi} d-block`} alt="Logo"/>
                <div className={classes.textContainer}>
                    <h1 className={classes.titoloServizi}>
                        ISO 50001
                    </h1>
                    <p className={classes.paragrafoServizi}>
                        Attraverso l’implementazione del <strong>Sistema di Gestione Energia ISO 50001</strong> le
                        aziende acquisiscono
                        strategie di gestione per aumentare e <strong>migliore l’efficienza energetica</strong>,
                        riducendo i costi.
                        La norma si pone come obiettivo quello di integrare l’efficienza energetica nelle pratiche di
                        gestione aziendali.<br></br><br></br>
                        Per ottenere questo obiettivo, la norma <strong>ISO 50001</strong> è stata strutturata in modo
                        da essere
                        <strong>facilmente integrata</strong> con altri sistemi di gestione (es. ISO 14001e ISO 9001).
                        L’obiettivo della
                        norma non è quello di definire specifici parametri di prestazione, ma
                        un <strong>metodo</strong> per ottenere un
                        <strong>miglioramento continuo</strong> dell’efficienza energetica.
                    </p>
                </div>
                <div className={classes.cardsContainer}>
                    <div className={classes.imageTextSection}>
                        <div className={classes.textSideRight}>
                            <h2 className={classes.sectionTitle}>Vantaggi</h2>
                            <p className={classes.sectionText}>
                                L’adozione della <strong>ISO 50001</strong>, oltre a <strong>migliorare le
                                performance</strong> energetiche, aumenta le
                                conoscenze e la consapevolezza del proprio sistema organizzativo e produttivo,
                                apportando numerosi <strong>effetti positivi indiretti.</strong> Diversi studi, come
                                quello della Harvard
                                Business School “The Performance Frontier: Innovating for a sustainable strategy”,
                                mostrano che investire in risorse per la sostenibilità determina nel tempo un
                                miglioramento delle performance finanziare rispetto a chi non lo fa. L’adozione di una
                                politica energetica mirata permette un <strong>miglioramento dell’immagine
                                aziendale</strong> riconosciuto sia in ambito europeo che internazionale.
                            </p>
                        </div>
                        <img src="/Vantaggi.jpg" className={classes.sectionImage} alt="Immagine 1"/>
                    </div>

                    <div className={classes.imageTextSection}>
                        <img
                            src="/Metodologia.jpg" className={classes.sectionImage} alt="Immagine degli Strumenti"
                        />
                        <div className={classes.textSideLeft}>
                            <h2 className={classes.sectionTitle}>Metodologia</h2>
                            <p className={classes.sectionText}>
                                La norma <strong>ISO 50001</strong> specifica i requisiti per stabilire, implementare,
                                mantenere e
                                migliorare un sistema di gestione dell’energia nell’organizzazione attraverso l’adozione
                                di una specifica <strong>politica energetica</strong>, di <strong>obiettivi</strong>, traguardi e piani di azione
                                collegati agli usi energetici significativi.<br></br>
                                In particolare la norma segue il processo di miglioramento continuo “Plan – Do – Check –
                                Act”, noto come Ciclo di Deming. Ad ogni fase infatti corrispondono specifiche azioni e
                                la definizione di ruoli e responsabilità, come un <strong>team energia</strong> che rappresenti le figure
                                in grado di influenzare l’uso dell’energia all’interno dell’azienda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
