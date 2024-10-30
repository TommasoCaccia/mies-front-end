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
                <div className={`${classes.paragrafo1} d-flex justify-content-center`}>
                    <Button href="/upload-file" className={`nav-link ${classes.controlloPulsante}`}>Controllo</Button>
                    <Button href="/dashboard/budget" className={`nav-link ${classes.budgetPulsante}`}>Budget</Button>
                    <Button href="/" className={`nav-link ${classes.futuresPulsante}`}>Futures</Button>
                    <Button href="/" className={`nav-link ${classes.esteroPulsante}`}>Estero</Button>
                </div>
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

            <iframe
                title="mies_13_6_24"
                width="1140"
                height="541.25"
                src="https://app.powerbi.com/reportEmbed?reportId=e9de65d8-c498-4cd0-90d2-02461019efde&autoAuth=true&ctid=69da13af-78cb-4dd9-b20c-087550f2b912"
                allowFullScreen={true}> 
            </iframe>
        </div>
    );
};

export default HomePage;
