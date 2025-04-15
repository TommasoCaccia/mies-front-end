import classes from '@/app/servizi/certificati-bianchi/page.module.css';

export default function CertificatiBianchi() {
    return (<>
        <img src="/CertificatiBianchi.webp" className={`${classes.imgDiagnosi}`} alt="Logo"/>

        <div className={classes.container}>
            <div className={classes.textTitle}>
                <h1 className={classes.titoloServizi}>
                    I Certificati Bianchi<br/>
                    premiano i tuoi risparmi
                </h1>
                <p className={classes.paragrafoServizi}>
                    I <strong>Certificati Bianchi</strong>, o titoli di efficienza energetica, sono un contributo
                    economico per chi
                    realizza interventi di efficienza energetica, riducendo il tempo di rientro degli
                    investimenti.<br/><br/>
                    Coloro che si dotano di tecnologie più efficienti rispetto alla media di mercato risparmiano
                    energia, diventano più competitivi e ricevono <strong>Certificati Bianchi</strong> come premio
                    in denaro per
                    l’intervento effettuato.<br/><br/>
                    Accedere al meccanismo dei <strong>Certificati Bianchi</strong> non ha costi, ma solo vantaggi!
                </p>
            </div>
            <div className={classes.cardsContainer}>
                <div className={classes.textContainer}>
                    <h2 className={classes.sectionTitle}>Come Funzionano</h2>
                    <p className={classes.sectionText}>
                        I <strong>Certificati Bianchi</strong> sono stati introdotti nella legislazione italiana
                        dal D.M. del 20
                        luglio 2004 per incentivare la realizzazione di interventi di efficienza energetica e
                        raggiungere gli obiettivi nazionali di risparmio.<br></br><br></br>
                        Il meccanismo, attivo da più di dieci anni, prevede l’erogazione di un contributo
                        economico come premio per la realizzazione di interventi di efficienza energetica.
                        L’incentivo viene erogato per cinque anni, durante i quali vengono certificati
                        periodicamente i risparmi energetici ottenuti.
                    </p>
                </div>
                <img src="/CEComeFunzionano.webp" className={classes.sectionImage} alt="Immagine 1"/>
            </div>
            <div className={classes.cardsContainerRev}>
                <img
                    src="/Metodologia.webp" className={classes.sectionImage} alt="Immagine degli Strumenti"
                />
                <div className={classes.textContainer}>
                    <h2 className={classes.sectionTitle}>Competenze</h2>
                    <p className={classes.sectionText}>
                        MIES ha acquisito un’ampia esperienza, accompagnando numerose aziende nella
                        realizzazione, gestione e supervisione di progetti di efficienza energetica fino al
                        raggiungimento del contributo economico.<br></br><br></br>
                        In particolare MIES è specializzata in progetti a consuntivo per il settore industriale,
                        con know how specifico su tematiche riguardanti refrigerazione, aria compressa, centrale
                        termica e generazione di vapore, illuminazione, macchinari, linee produttive ad alta
                        efficienza.
                    </p>
                </div>
            </div>
            <div className={classes.cardsContainer}>
                <div className={classes.textContainer}>
                    <h2 className={classes.sectionTitle}>Attività</h2>
                    <p className={classes.sectionText}>
                        MIES effettua sopralluoghi gratuiti per valutare la possibilità di accesso al meccanismo
                        dei <strong>Certificati Bianchi</strong> per interventi di efficienza energetica da
                        realizzare o per
                        individuare le possibili aree di intervento.<br></br><br></br>
                        MIES si occupa inoltre dello sviluppo e della gestione di tutte le pratiche tecniche e
                        normative per l’ottenimento dei <strong>Certificati Bianchi</strong>, compresa la
                        gestione finanziaria
                        dei titoli attraverso i principali canali di vendita.
                    </p>
                </div>
                <img src="/CEAttivita.webp" className={classes.sectionImage} alt="Immagine 1"/>
            </div>
        </div>
    </>);
}
