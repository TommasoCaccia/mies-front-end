import classes from '@/app/servizi/diagnosi-energetica/page.module.css';

export default function DiagnosiEnergetica() {
    return (
        <>
            <img src="/Diagnosi.webp" className={classes.imgDiagnosi} alt="Logo"/>
            <div className={classes.container}>
                <div className={classes.textTitle}>
                    <h1 className={classes.titoloServizi}>
                        LA DIAGNOSI ENERGETICA <br></br>
                        SVELA LE REALI OPPORTUNITÀ DI RISPARMIO
                    </h1>
                    <p className={classes.paragrafoServizi}>
                        La <strong>Diagnosi Energetica</strong> permette di avere una chiara e completa definizione dei
                        consumi e delle prestazioni energetiche della propria azienda, e consente di individuare e
                        quantificare le reali opportunità di risparmio.<br></br><br></br>
                        Attraverso la mappatura delle utenze aziendali ed all’analisi costi-benefici l’Azienda dispone
                        di un potente strumento decisionale. La conoscenza completa della propria azienda sotto il
                        profilo energetico, infatti, permette una concreta pianificazione degli interventi di
                        miglioramento.
                    </p>
                </div>
                <div className={classes.cardsContainer}>
                    <div className={classes.textContainer}>
                        <h2 className={classes.sectionTitle}>Non un obbligo, ma un’opportunità</h2>
                        <p className={classes.sectionText}>
                            Il recepimento della Direttiva Europea 2012/27/UE, attraverso il Dlgs 102/2014, ha
                            portato ad un obbligo di Diagnosi Energetica per le aziende Energivore e per le Grandi
                            Imprese. L’Audit Energetico, se condotto su misura e a partire dai dati provenienti dal
                            campo, assumerà il significato di risorsa e fonte di opportunità.
                            <br></br> <br></br>
                            Un giusto approccio all’efficienza energetica non nasce da obblighi o emergenze, ma da
                            azioni programmate nel tempo che permettano alle azienda di consumare meno energia a
                            parità di servizi offerti.
                        </p>
                    </div>
                    <img src="/Opportunita.webp" className={classes.sectionImage} alt="Immagine 1"/>
                </div>

                <div className={classes.cardsContainerRev}>
                    <img src="/Strumenti.webp" className={classes.sectionImage} alt="Immagine degli Strumenti"/>
                    <div className={classes.textContainer}>
                        <h2 className={classes.sectionTitle}>Strumenti e Soluzioni</h2>
                        <p className={classes.sectionText}>
                            MIES mette a disposizione strumenti e soluzioni personalizzate:
                        </p>

                        <ul className={classes.sectionList}>
                            <li>
                                Soluzioni ad alta efficienza energetica con possibilità di contratti a
                                garanzia di risultato (EPC)
                            </li>
                            <li>
                                Miglioramento delle modalità di gestione e manutenzione degli impianti
                                e buone pratiche
                            </li>
                            <li>Sistemi di monitoraggio dei consumi energetici</li>
                            <li>Ottimizzazione dei contratti di fornitura energetica</li>
                            <li>Ottenimento ISO 50001</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}
