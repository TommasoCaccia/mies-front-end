import classes from '@/app/servizi/engineering/page.module.css';

export default function Enegineering() {
    return (
        <>
            <div className={`container ${classes.container}`}>
                <img src="/Engineering.jpg" className={`${classes.imgDiagnosi} d-block`} alt="Logo"/>
                <div className={classes.textContainer}>
                    <h1 className={classes.titoloServizi}>
                        ENGINEERING, IL SUPPORTO CONCRETO<br></br>
                        AI TUOI PROGETTI
                    </h1>
                    <p className={classes.paragrafoServizi}>
                        Attraverso il servizio <strong>Engineering</strong> le aziende hanno la possibilità di
                        realizzare interventi di
                        efficienza energetica con un partner affidabile ed esperto in soluzioni per il settore
                        industriale, ottenendo supporto sia nella valutazione della migliore soluzione sia nella sua
                        realizzazione.<br></br><br></br>
                        Per garantire soluzioni personalizzate, MIES usa la propria esperienza dei processi produttivi
                        nei principali settori manifatturieri e la partnership con importanti player tecnologici. A
                        seguito di campagne di misura mirate, analisi e verifica dei risultati e studio del processo, la
                        soluzione di efficienza energetica può consistere nell’ottimizzazione dei parametri e delle
                        logiche di funzionamento, oppure nella sostituzione di macchinari o componenti impiantistici…
                    </p>
                </div>
                <div className={classes.cardsContainer}>
                    <div className={classes.imageTextSection}>
                        <div className={classes.textSideRight}>
                            <h2 className={classes.sectionTitle}>Refrigerazione</h2>
                            <p className={classes.sectionText}>
                                Gli impianti di refrigerazione sono, per loro natura, energivori. Per questo un’analisi
                                approfondita delle caratteristiche del processo e impiantistiche può portare ad
                                individuare ampi margini di risparmio. Esperienza nella ricerca di soluzioni
                                tecnologiche all’avanguardia e la conoscenza dei processi industriali.
                                <br></br> <br></br>
                                A partire dalle informazioni sulla tipologia di prodotto e sul processo produttivo,
                                campagne di misura e simulazioni è possibile definire per ciascuna azienda la migliore
                                soluzione di efficienza energetica grazie all’ottimizzazione dei parametri di esercizio,
                                eventuali integrazioni impiantistiche, free cooling…
                            </p>
                        </div>
                        <img src="/Refrigerazione.jpg" className={classes.sectionImage} alt="Immagine 1"/>
                    </div>

                    <div className={classes.imageTextSection}>
                        <img
                            src="/Compressore.jpg" className={classes.sectionImage} alt="Immagine degli Strumenti"
                        />
                        <div className={classes.textSideLeft}>
                            <h2 className={classes.sectionTitle}>Aria compressa</h2>
                            <p className={classes.sectionText}>
                                Confrontando le incidenze percentuali del costo del ciclo di vita di un compressore,
                                l’investimento pesa mediamente il 18% del totale, mentre l’energia elettrica circa il
                                73%. Questo si traduce in un criterio di scelta in fase di acquisto del macchinario e
                                pone l’attenzione sulla corretta conduzione degli impianti.
                                <br></br> <br></br>
                                MIES si propone come partner per la realizzazione di interventi di efficienza energetica
                                nei sistemi ad aria compressa, dalle campagne di misura per verificare il costo del m3
                                d’aria, la presenza perdite, l’adeguatezza dei parametri di funzionamento e dei
                                componenti… Attraverso l’analisi dei risultati sarà possibile definire la migliore
                                soluzione per le aziende.
                            </p>
                        </div>

                    </div>
                    <div className={classes.imageTextSection}>
                        <div className={classes.textSideRight}>
                            <h2 className={classes.sectionTitle}>Centrale termica</h2>
                            <p className={classes.sectionText}>
                                Lo studio della produzione e distribuzione dei fluidi termovettori è più complesso
                                rispetto ad un’analisi di tipo elettrico. Tuttavia le perdite energetiche associate ad
                                una linea di distribuzione di un fluido caldo, per un’azienda produttiva, possono
                                raggiungere il 15% dell’energia termica prodotta.
                                <br></br> <br></br>
                                MIES effettua analisi specifiche sui vettori utilizzati, parametri di funzionamento,
                                generatori di vapore, linee di distribuzione e utenze di tipo termico. Le soluzioni
                                proposte spaziano dalla coibentazione delle linee di distribuzione alla valorizzazione
                                del contenuto termico dei fumi, dalla sostituzione di scaricatori di condensa al
                                recupero dei flussi caldi presenti…
                            </p>
                        </div>
                        <img src="/CentraleTermica.jpg" className={classes.sectionImage} alt="Immagine 1"/>
                    </div>
                    <div className={classes.imageTextSection}>
                        <img
                            src="/CentraleTermica2.jpg" className={classes.sectionImage} alt="Immagine degli Strumenti"
                        />
                        <div className={classes.textSideLeft}>
                            <h2 className={classes.sectionTitle}>Processo produttivo</h2>
                            <p className={classes.sectionText}>
                                I macchinari che costituiscono il processo produttivo sono il cuore operativo di
                                un’azienda e richiedono grande attenzione per garantire continuità e qualità al
                                prodotto. È quindi necessario sapere quali macchine producono in maniera più efficiente,
                                e come questi consumi si collocano nel mercato.
                                <br></br> <br></br>
                                MIES offre la propria esperienza per effettuare campagne di misura per la definizione di
                                indici prestazionali, il confronto con benchmark e medie di mercato, e per definire
                                possibili margini di miglioramento, simulando il funzionamento di nuovi macchinari e
                                nuove linee di processo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
