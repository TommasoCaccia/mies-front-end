"use client"
import CardComponent from "@/Components/card/card";
import classes from '@/app/servizi/page.module.css';

export default function Home() {
    return (
        <>
            <div className={`container ${classes.container}`}>
                <img src="/Diagnosi.jpg" className={`${classes.imgServizi} d-block`} alt="Logo"/>
                <div className={classes.textContainer}>
                    <h1 className={classes.titoloServizi}>I SERVIZI DI MIES</h1>
                    <p className={classes.paragrafoServizi}>
                        Il successo di un’impresa passa attraverso la riduzione dei costi e <strong
                        className={classes.strong}>l'ottimizzazione dei processi.</strong> È sempre più evidente,
                        infatti, come
                        l’adozione di soluzioni e sistemi efficienti per
                        un’azienda non solo porti a un <strong className={classes.strong}>contenimento dei
                        costi</strong>,
                        ma soprattutto costituisca uno strumento
                        per <strong className={classes.strong}>migliorare il proprio processo produttivo e
                        l'organizzazione interna.</strong><br></br><br></br>
                        <strong className={classes.strong}>L'efficienza Energetica</strong> non consiste nella semplice
                        sostituzione di un
                        macchinario vecchio con uno più nuovo,
                        bensì è uno strumento strategico a supporto dei processi decisionali, finalizzato al
                        miglioramento del proprio core business. <strong className={classes.strong}>MIES</strong> è
                        partner di
                        molte aziende che hanno <strong className={classes.strong}>aumentato la propria
                        competitività</strong> attraverso l’efficienza
                        energetica e la corretta gestione dei costi
                        energetici con una completa digitalizzazione del “Sistema Fabbrica” in conformità alle ultime
                        direttive di <strong className={classes.strong}>Industry 4.0</strong>.
                    </p>
                </div>
                <div className={classes.cardsContainer}>
                    <CardComponent/>
                </div>
            </div>
        </>
    );
}
