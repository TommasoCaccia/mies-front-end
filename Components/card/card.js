"use client";
import React from "react";
import classes from "@/Components/card/card.module.css";

const Card = ({number, title, content, imgSrc, imgStyle, link, extraClass}) => {
    return (

        <figure className={`${classes.card} ${classes.shapeBoxHalf} ${extraClass || ""}`}>
            <img
                src={imgSrc}
                className={`${classes.logo} d-block`}
                alt="Logo"
                style={imgStyle}
            />
            <div
                className={`${classes.brkAbsOverlay} ${classes.zIndex0} ${classes.bgBlack} ${classes.opacity60}`}
            ></div>
            <figcaption>
                <div className={classes.showCont}>
                    <h3 className={classes.cardNo}>{number}</h3>
                    <h4
                        className={`${classes.cardMainTitle}`}
                        dangerouslySetInnerHTML={{__html: title}}
                    ></h4>
                </div>
                <p
                    className={classes.cardContent}
                    dangerouslySetInnerHTML={{__html: content}}
                ></p>
                <a href={link} className={classes.readMoreBtn}>
                    Approfondisci
                </a>
            </figcaption>
            <span className={classes.after}></span>
        </figure>
    );
};

const ShapeBox = () => {
    return (
        <div className={`box-wrapper ${classes.boxWrapper}`}>
            <Card
                number="01"
                title="Diagnosi<br>Energetica"
                content="La <strong>Diagnosi Energetica</strong> permette di avere una definizione dei consumi e delle prestazioni energetiche della propria azienda, e consente di quantificare le reali opportunità di risparmio."
                imgSrc="/Diagnosi.jpg"
                link="/servizi/diagnosi-energetica"
                imgStyle={{width: "1500px", height: "auto"}}
            />
            <Card
                number="02"
                title="Engineering"
                content="Attraverso il servizio <strong>Engineering</strong> le aziende hanno la possibilità di realizzare interventi di efficienza energetica con un partner affidabile ed esperto in soluzioni per il settore industriale."
                imgSrc="/Engineering.jpg"
                link="/servizi/engineering"
                imgStyle={{
                    width: "1570px",
                    height: "auto",
                    marginLeft: "-380px",
                    marginTop: "-20px",
                }}
            />
            <Card
                number="03"
                title="Sistema di Monitoraggio"
                content="Un’azienda può diventare veramente efficiente solo avendo consapevolezza di dove, quanto e come consuma. Per rispondere a questa esigenza MIES ha sviluppato <strong>OneView.</strong>"
                imgSrc="/OneView.jpg"
                link="/servizi/sistema-monitoraggio"
                imgStyle={{width: "1550px", height: "auto", marginTop: "-10px"}}
            />
            <Card
                number="04"
                title="Energy<br>Performance"
                content="I contratti <strong>EPC</strong> permettono di effettuare gli interventi di efficienza energetica più vantaggiosi per la propria azienda, disponendo di una garanzia sicura sulle prestazioni energetiche."
                imgSrc="/EnergyPerformance.jpg"
                link="/servizi/energy-performance"
                imgStyle={{
                    width: "1500px",
                    height: "auto",
                    marginLeft: "-1100px",
                }}
            />
            <Card
                number="05"
                title="Energy<br>Portfolio"
                content="Attraverso il servizio <strong>Energy Portfolio</strong>, MIES svolge un’attività di ottimizzazione dei contratti di acquisto dell’energia, grazie alla quale le aziende riducono i costi di approvvigionamento energetico."
                imgSrc="/EnergyPortfolio.jpg"
                link="/servizi/energy-portfolio"
                imgStyle={{width: "1500px", height: "auto"}}
            />
            <Card
                number="06"
                title="ISO 50001"
                content="Attraverso l’implementazione del <strong>Sistema di Gestione Energia ISO 50001</strong> le aziende acquisiscono strategie di gestione per aumentare e migliore l’efficienza energetica, riducendo i costi."
                imgSrc="/ISO50001.jpg"
                link="/servizi/iso500001"
                imgStyle={{width: "1500px", height: "auto"}}
            />
            <Card
                number="07"
                title="Certificati<br>Bianchi"
                content="I <strong>Certificati Bianchi</strong>, o titoli di efficienza energetica, sono un contributo economico per chi realizza interventi di efficienza energetica, riducendo il tempo di rientro degli investimenti."
                imgSrc="/CertificatiBianchi.jpg"
                link="/servizi/certificati-bianchi"
                imgStyle={{width: "1500px", height: "auto", marginLeft: "-800px",}}
                extraClass={classes.cardSettima}
            />
        </div>
    );
};

export default ShapeBox;
