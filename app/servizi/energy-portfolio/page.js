import classes from '@/app/servizi/energy-portfolio/page.module.css';

export default function EnergyPortfolio() {
    return (
        <>
            <div className={`container ${classes.container}`}>
                <img src="/EnergyPortfolio.jpg" className={`${classes.imgDiagnosi} d-block`} alt="Logo"/>
                <div className={classes.textContainer}>
                    <h1 className={classes.titoloServizi}>
                        ENERGY PORTFOLIO<br></br>
                        IL PREZZO ENERGIA SU MISURA PER TE
                    </h1>
                    <p className={classes.paragrafoServizi}>
                        Attraverso il servizio <strong>Energy Portfolio</strong>, MIES svolge un’attività specifica di
                        ottimizzazione dei
                        contratti di acquisto dell’energia, grazie alla quale le aziende riducono i costi di
                        approvvigionamento energetico. L’energia infatti non va percepita come una tassa su cui si è
                        convinti di non potere intervenire in alcun modo, ma una risorsa da ottimizzare per aumentare la
                        propria competitività.<br></br><br></br>
                        MIES offre il servizio <strong>Energy Portfolio</strong> a tutte le aziende che vogliono
                        rimanere concentrate sul
                        proprio core business, senza rinunciare all’ottimizzazione del prezzo energia.
                    </p>
                </div>
                <div className={classes.cardsContainer}>
                    <div className={classes.imageTextSection}>
                        <div className={classes.textSideRight}>
                            <h2 className={classes.sectionTitle}>Gestione Prezzo Energia</h2>
                            <p className={classes.sectionText}>
                                Il servizio di <strong>Energy Portfolio</strong> prevede un’analisi preliminare
                                gratuita per valutare in
                                maniera chiara e oggettiva se il prezzo pagato per la fornitura di energia è ottimale
                                rispetto al proprio profilo consumi e ai valori medi di mercato. Attraverso l’analisi
                                del profilo storico dei consumi aziendali, è possibile studiare la migliore formula
                                contrattuale e ottimizzare il prezzo di fornitura. MIES, inoltre, informa con analisi
                                periodiche il cliente sull’andamento del prezzo contrattato rispetto ai valori medi di
                                mercato ed altri trend significativi.
                            </p>
                        </div>
                        <img src="/EPGestionePrezzoEnergia.jpg" className={classes.sectionImage} alt="Immagine 1"/>
                    </div>

                    <div className={classes.imageTextSection}>
                        <img
                            src="/EPVerificaFatture.jpg" className={classes.sectionImage} alt="Immagine degli Strumenti"
                        />
                        <div className={classes.textSideLeft}>
                            <h2 className={classes.sectionTitle}>Verifica Fatture</h2>
                            <p className={classes.sectionText}>
                                All’interno del servizio <strong>Energy Portfolio</strong>, MIES verifica mensilmente le
                                fatture
                                energetiche, controllando la correttezza dell’attribuzione del prezzo energia;
                                verificando i corrispettivi riferiti a perdite di rete, dispacciamento, trasporto, oneri
                                e imposte; accertando eventuali storni o addebiti.<br></br><br></br>
                                Infine, MIES informa costantemente i propri clienti sui cambiamenti normativi e le
                                novità inerenti il mercato dell’energia, la fatturazione e le eventuali variazioni delle
                                voci presenti in fattura (oneri, penali…).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
