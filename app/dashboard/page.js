"use client"

import React from 'react';
import {Dropdown, DropdownButton, Button, Form} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import Link from 'next/link';
import classes from '@/app/dashboard/page.module.css';

Chart.register(...registerables);

const dataEuro = {
    labels: ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DEC'],
    datasets: [
        {
            label: '€',
            data: [100, 200, 300, 500, 400, 600, 700, 500, 400, 300, 200, 100],
            borderColor: '#2C4D79',
            borderWidth: 1,
            fill: false,
        },
    ],
};

const dataKwh = {
    labels: ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DEC'],
    datasets: [
        {
            label: 'Kwh',
            data: [600, 500, 400, 300, 200, 100, 200, 300, 400, 500, 600, 700],
            borderColor: '#2C4D79',
            borderWidth: 1,
            fill: false,
        },
    ],
};

const CustomToggle = React.forwardRef(({children, onClick, className}, ref) => (
    <button
        ref={ref}
        className={`${classes.podPulsante} dropdown-toggle ${className}`}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </button>
));


const HomePage = () => {
    return (
        <div className={`${classes.container} container`}>
            <div className="d-flex justify-content-between mb-4">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-anno" className={classes.podPulsante}>
                        POD
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classes.dropdownPod}>
                        <Form.Check type="checkbox" label="POD 1"/>
                        <Form.Check type="checkbox" label="POD 2"/>
                        <Form.Check type="checkbox" label="POD 3"/>
                        <Form.Check type="checkbox" label="POD 4"/>
                    </Dropdown.Menu>
                </Dropdown>
                <div className={`${classes.spaziaturaPulsanti} d-flex justify-content-center`}>
                    <Link href="/dashboard/fassa"><Button className={classes.fassaPulsante}>FASSA</Button></Link>
                    <Link href="/dashboard/impa"><Button className={classes.impaPulsante}>IMPA</Button></Link>
                    <Link href="/dashboard/cb"><Button className={classes.cbPulsante}>CB</Button></Link>
                    <Link href="/dashboard/estero"><Button className={classes.esteroPulsante}>ESTERO</Button></Link>
                </div>
            </div>
            <div className={`${classes.paragrafo2} d-flex justify-content-between`}>
                <Link href="/upload-file"><Button className={classes.controlloPulsante}>Controllo</Button></Link>
                <Link href="/dashboard/budget"><Button className={classes.budgetPulsante}>Budget</Button></Link>
                <Link href="/dashboard/futures"><Button className={classes.futuresPulsante}>Futures</Button></Link>
            </div>
            <div className={`${classes.annomese} d-flex justify-content-between mb-4`}>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-anno" className={classes.annoPulsante}>
                        ANNO
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classes.dropdownAnno}>
                        <Form.Check type="checkbox" label="2023"/>
                        <Form.Check type="checkbox" label="2024"/>
                        <Form.Check type="checkbox" label="2025"/>
                        <Form.Check type="checkbox" label="2026"/>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-anno" className={classes.mesePulsante}>
                        MESE
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classes.dropdownMese}>
                        <Form.Check type="checkbox" label="GEN"/>
                        <Form.Check type="checkbox" label="FEB"/>
                        <Form.Check type="checkbox" label="MAR"/>
                        <Form.Check type="checkbox" label="APR"/>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className={`${classes.grafici} row`}>
                <div className={`${classes.grafico1} col-md-6`}>
                    <Line data={dataEuro}/>
                </div>
                <div className={`${classes.grafico1} col-md-6`}>
                    <Line data={dataKwh}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
