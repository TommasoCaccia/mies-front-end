"use client";

import React, {useState} from 'react';
import classes from '@/app/dashboard/page.module.css/';
import Link from "next/link";

const Dashboard = () => {
    const [showPodDropdown, setShowPodDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);

    const togglePodDropdown = () => setShowPodDropdown(!showPodDropdown);
    const toggleYearDropdown = () => setShowYearDropdown(!showYearDropdown);
    const toggleMonthDropdown = () => setShowMonthDropdown(!showMonthDropdown);

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.pod}>
                    <div onClick={togglePodDropdown} className={classes.podPulsante}>POD</div>
                    <div className={`${classes.dropdown} ${showPodDropdown ? classes.show : ''}`}>
                        <ul>
                            <li><input type="checkbox" id="pod1"/> POD 1</li>
                            <li><input type="checkbox" id="pod2"/> POD 2</li>
                            <li><input type="checkbox" id="pod3"/> POD 3</li>
                            <li><input type="checkbox" id="pod4"/> POD 4</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.menu}>
                    <div className="cta-wrapper  d-flex flex">
                        <Link href="/login" className={classes.fassaPulsante}>Fassa</Link>
                    </div>
                    <div className="cta-wrapper  d-flex flex">
                        <Link href="/login" className={classes.impaPulsante}>Impa</Link>
                    </div>
                    <div className="cta-wrapper  d-flex flex">
                        <Link href="/login" className={classes.cbPulsante}>Cb</Link>
                    </div>
                    <div className="cta-wrapper  d-flex flex">
                        <Link href="/login" className={classes.esteroPulsante}>Estero</Link>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <div className="cta-wrapper  d-flex flex">
                    <Link href="/login" className={classes.controlloPulsante}>Controllo</Link>
                </div>
                <div className="cta-wrapper  d-flex flex">
                    <Link href="/login" className={classes.budgetPulsante}>Budget</Link>
                </div>
                <div className="cta-wrapper  d-flex flex">
                    <Link href="/login" className={classes.futuresPulsante}>Futures</Link>
                </div>
            </div>
            <div className={classes.filters}>
                <div>
                    <div onClick={toggleYearDropdown} className={classes.annoPulsante}>ANNO</div>
                    <div className={`${classes.dropdown} ${showYearDropdown ? classes.show : ''}`}>
                        <ul>
                            <li><input type="checkbox" id="year2023"/> 2023</li>
                            <li><input type="checkbox" id="year2024"/> 2024</li>
                            <li><input type="checkbox" id="year2025"/> 2025</li>
                            <li><input type="checkbox" id="year2026"/> 2026</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div onClick={toggleMonthDropdown} className={classes.mesePulsante}>MESE</div>
                    <div className={`${classes.dropdown} ${showMonthDropdown ? classes.show : ''}`}>
                        <ul>
                            <li><input type="checkbox" id="jan"/> GEN</li>
                            <li><input type="checkbox" id="feb"/> FEB</li>
                            <li><input type="checkbox" id="mar"/> MAR</li>
                            <li><input type="checkbox" id="apr"/> APR</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.charts}>
                <div className={classes.chartPlaceholder}></div>
                <div className={classes.chartPlaceholder2}></div>
            </div>
        </div>
    );
};

export default Dashboard;
