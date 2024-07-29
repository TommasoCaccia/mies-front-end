import classes from '@/app/servizi/energy-performance/page.module.css';

export default function EnergyPerformance() {
    return (
        <>
            <div className={`container ${classes.container}`}>
                <img src="/EnergyPerformance.jpg" className={`${classes.imgDiagnosi} d-block`} alt="Logo"/>
                <div className={classes.textContainer}>
                    <h1 className={classes.titoloServizi}>
                        L’Energy Performance Contract<br></br>
                        è la nostra garanzia per i tuoi risparmi
                    </h1>
                    <p className={classes.paragrafoServizi}>
                        Gli <strong>Energy Performance Contract</strong> permettono di effettuare gli interventi di
                        efficienza energetica
                        più vantaggiosi per la propria azienda, disponendo di una garanzia sicura sulle prestazioni
                        energetiche.<br></br>
                        Infatti, se l’intervento produce risparmi inferiori rispetto a quelli attesi, MIES si impegna a
                        restituire la differenza in denaro all’azienda.<br></br><br></br>
                        Inoltre, attraverso questa formula contrattuale è possibile accedere ad un finanziamento
                        parziale o totale dell’intervento, con la possibilità di ripagare lo stesso con i flussi di
                        cassa conseguiti grazie all’efficienza ottenuta.
                    </p>
                </div>
                <div className={classes.cardsContainer}>
                    <div className={classes.imageTextSection}>
                        <div className={classes.textSideRight}>
                            <h2 className={classes.sectionTitle}>Il Contratto</h2>
                            <p className={classes.sectionText}>
                                Il termine EPC – <strong>Energy Performance Contract</strong> – non indica una tipologia
                                di contratto
                                standardizzato, ma definisce piuttosto una gamma di contratti personalizzati per le
                                reali esigenze del cliente, in cui i risparmi energetici devono essere garantiti. Nello
                                specifico, all’interno del contratto, sono indicate sia informazioni di tipo tecnico
                                come la definizione della baseline di riferimento, la misurazione dei consumi, ma anche
                                di tipo gestionale come gli obblighi e i diritti dei contraenti, la modalità con cui
                                viene garantita la performance energetica ed eventualmente gli aspetti inerenti al
                                finanziamento dell’intervento.
                            </p>
                        </div>
                        <img src="/E-ProcessoProduttivo.jpg" className={classes.sectionImage} alt="Immagine 1"/>
                    </div>

                    <div className={classes.imageTextSection}>
                        <img
                            src="/CECompetenze.jpg" className={classes.sectionImage} alt="Immagine degli Strumenti"
                        />
                        <div className={classes.textSideLeft}>
                            <h2 className={classes.sectionTitle}>Competenze</h2>
                            <p className={classes.sectionText}>
                                MIES offre un servizio energetico a garanzia di risultato secondo la norma 11352, che
                                certifica i requisiti generali e le capacità che una ESCo deve possedere per offrire
                                servizi di efficienza energetica alle Aziende.<br></br><br></br>
                                L’esperienza pluriennale di MIES nella proposta di contratti con performance garantite e
                                la collaborazione con legali esperti in materia energetica si traducono in formule
                                contrattuali chiare, personalizzate e complete.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
