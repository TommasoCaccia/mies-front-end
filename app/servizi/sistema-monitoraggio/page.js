import classes from '@/app/servizi/sistema-monitoraggio/page.module.css';

export default function SistemaMonitoraggio() {
    return (
        <div className={classes.container}>
            <img src="/OneView.jpg" className={classes.imgDiagnosi} alt="Logo"/>
            <div className={classes.textTitle}>
                <h1 className={classes.titoloServizi}>
                    OneView: Riduce<br></br>
                    i Costi migliora le Prestazioni
                </h1>
                <p className={classes.paragrafoServizi}>
                    Un’azienda può crescere in efficienza solo avendo consapevolezza di dove, quanto e come consuma.
                    Per rispondere a questa esigenza MIES ha sviluppato OneView, un innovativo sistema di Energy
                    Management che nasce dall’esperienza maturata sul campo, da sopralluoghi tecnici e dalla
                    convinzione che il monitoraggio non è semplicemente la visualizzazione di dati provenienti da
                    strumenti di misura, bensì un processo virtuoso che li trasforma in informazioni utili e queste
                    in consigli operativi.<br></br>
                    <strong>OneView</strong> offre tutto questo in maniera dinamica, personalizzata ed estremamente
                    semplice…<br></br><br></br>
                    La semplicità riguarda sia l’utilizzo del software sia la realizzazione hardware dato che il
                    cablaggio è semplificato grazie all’utilizzo di protocolli come LoRa, OPC-UA, ModBus… che sono
                    già integrati nel <strong>“PC OneView”.</strong><br></br>
                    Il sistema offre inoltre all’utente sia un archivio in “locale” sempre disponibile, sia in Cloud
                    per una utilizzo sempre connesso.
                </p>
            </div>

            <div className={classes.cardsContainer}>
                <div className={classes.textContainer}>
                    <h2 className={classes.sectionTitle}>Opportunità di crescita</h2>
                    <p className={classes.sectionText}>
                        <strong>OneView</strong> permette di conoscere in maniera puntuale i consumi aziendali,
                        calcola i costi
                        energetici, individua gli sprechi e mette in evidenza le opportunità di crescita.
                        <strong>OneView</strong> è il sistema di <strong>Energy Management</strong> in supporto
                        al processo decisionale che è in
                        grado di confrontare i dati acquisiti dal campo con i benchmark di riferimento e le
                        migliori tecnologie presenti a mercato.
                    </p>
                </div>
                <img src="/OneViewCrescita.jpg" className={classes.sectionImage} alt="Immagine 1"/>
            </div>

            <div className={classes.cardsContainerRev}>
                <img
                    src="/OneViewDinamico.jpg" className={classes.sectionImage} alt="Immagine degli Strumenti"
                />
                <div className={classes.textContainer}>
                    <h2 className={classes.sectionTitle}>Dinamico e sempre aggiornato</h2>
                    <p className={classes.sectionText}>
                        <strong>OneView</strong> è un sistema sempre aggiornato e dinamico, capace di adattarsi
                        alle esigenze
                        aziendali, il supporto continuo del team MIES permette di avere informazioni
                        personalizzate per rispondere alle <strong>esigenze di vari utenti:</strong> dal
                        responsabile tecnico
                        all’ufficio acquisti, dal finance al direttore generale.
                    </p>
                </div>

            </div>

            <div className={classes.cardsContainer}>
                <div className={classes.textContainer}>
                    <h2 className={classes.sectionTitle}>Risparmio e innovazione</h2>
                    <p className={classes.sectionText}>
                        <strong>OneView</strong> ti permette di confrontare macchinari diversi a parità di
                        produzione e consente
                        di verificare il rendimento di un macchinario al variare del prodotto lavorato. Consente
                        di simulare il funzionamento di un macchinario prima che venga installato, permettendo
                        così di verificarne in anticipo i reali risparmi e i benefici prestazionali.
                    </p>
                </div>
                <img src="/OneViewRisparmio.jpg" className={classes.sectionImage} alt="Immagine 1"/>
            </div>
        </div>
    );
}
