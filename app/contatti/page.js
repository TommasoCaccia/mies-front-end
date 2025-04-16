"use client";
import React from 'react';
import classes from '@/app/contatti/page.module.css';
import Card from '../../Components/cardTeam/cardTeam';
import SendEmailForm from "@/Components/formEmail/form";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import('@/Components/Map/map'), { ssr: false });

const Contatti = () => {
    return (
        <div className={classes.page}>
            <div className={classes.mapContainer}>
               <MyMap/>
            </div>
            <div className={classes.container}>
                <main className={classes.mainContent}>
                    <h1 className={classes.titoloPrincipale}>LA SEDE MIES</h1>
                    <p>
                        Ti diamo il benvenuto in MIES. <br />
                        Mettiti in contatto senza alcun impegno, ti risponderemo al più presto!
                    </p>
                    <div className={classes.cardContainer}>
                        <Card />
                    </div>
                    <section className={classes.emailSection}>
                        <SendEmailForm />
                    </section>
                </main>
                <aside className={classes.sidebarContainer}>
                    <div className={classes.infoBlock}>
                        <h2 className={classes.sedeLegale}>Sede Operativa</h2>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Indirizzo</strong>
                            <br />
                            Via Puricelli 1
                            <br />
                            Gallarate 21013 (VA) - Italia
                        </p>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Contatti</strong>
                            <br />
                            amministrazione@miesgroup.it
                        </p>
                        <p className={classes.paragrafiSedeLegale}>
                            <strong className={classes.strong}>Orari di apertura</strong>
                            <br />
                            Lun-Ven: 9:00-18:00
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Contatti;
