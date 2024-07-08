"use client"
import React, {useEffect, useState} from 'react';
import {Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Alert} from 'react-bootstrap';
import {FaFilter} from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

function DataEntry() {
    const [showFilter] = useState(false);
    const [filterName] = useState('');
    const [data, setData] = useState([]);


    const aggiungiCosto = async () => {
        const descrizione = event.target.nome ? event.target.nome.value : undefined;
        const unitaMisura = event.target.unitaDiMisura ? event.target.unitaDiMisura.value : undefined;
        const costo = event.target.valore ? event.target.valore.value : undefined;
        const trimestrale = event.target.trimestreAnno ? event.target.trimestreAnno.value : undefined;

        const response = await fetch('http://localhost:8080/costi/aggiungi', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({descrizione, unitaMisura, costo, trimestrale})
        });

        if (response.ok) {
            console.log(response);
            const data = await response.json(); // Cambiato da response a response.json()
            //console.log('Risposta del server:', data);
            //console.log('Costo aggiunto con successo');
        } else {
            const text = await response.text();
            //console.log('Errore del server:', text);
            //console.error('Errore durante l\'aggiunta del costo');
        }

    }
    useEffect(() => {
        const costi = async () => {
            const response = await fetch('http://localhost:8080/costi', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const text = await response.text();
                if (text) {
                    const data = JSON.parse(text);
                    setData(data);
                } else {
                    console.error('Errore durante il recupero dei costi');
                }
            }
        }
        costi();
    }, []);

    return (
        <div className={`${classes.container} container`}>
            {showFilter && (
                <div className="mb-3">
                    <FormControl
                        placeholder="Filtra per nome"
                        aria-label="Filtra per nome"
                        value={filterName}
                        onChange={() => {
                        }}
                    />
                </div>
            )}
            <div className={classes.tableresponsive}>
                <Table className={classes.tabella} bordered hover>
                    <thead>
                    <tr>
                        <th>
                            Nome
                            <Button
                                variant="link"
                                className="p-0 ml-2"
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <FaFilter className={classes.icona}/>
                            </Button>
                        </th>
                        <th>Unità di Misura</th>
                        <th>Trimestre 1</th>
                        <th>Trimestre 2</th>
                        <th>Trimestre 3</th>
                        <th>Trimestre 4</th>
                        <th>Annuale</th>
                        {data.length > 0 && <th>Azioni</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((costo, index) => (
                        <tr key={index}>
                            <td>{costo.nome}</td>
                            <td>{costo.unitaDiMisura}</td>
                            <td>{costo.trimestre1}</td>
                            <td>{costo.trimestre2}</td>
                            <td>{costo.trimestre3}</td>
                            <td>{costo.trimestre4}</td>
                            <td>{costo.annuale}</td>
                            <td>
                                <Button variant="link" className="p-0">Modifica</Button>
                                <Button variant="link" className="p-0">Elimina</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <div className={classes.formcontainer}>
                <Form onSubmit={aggiungiCosto}>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={classes.formNome}
                            placeholder="Nome"
                            aria-label="Nome"
                            name="nome"
                            onChange={() => {
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={classes.formUnitadimisura}
                            placeholder="Unità di Misura"
                            aria-label="Unità di Misura"
                            onChange={() => {
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" name="trimestrale">
                        <DropdownButton
                            className={classes.customDropdownButton}
                            title="Seleziona Trimestre/Annuale"
                            onSelect={() => {
                            }}
                        >
                            <Dropdown.Item eventKey="trimestre1">Trimestre 1</Dropdown.Item>
                            <Dropdown.Item eventKey="trimestre2">Trimestre 2</Dropdown.Item>
                            <Dropdown.Item eventKey="trimestre3">Trimestre 3</Dropdown.Item>
                            <Dropdown.Item eventKey="trimestre4">Trimestre 4</Dropdown.Item>
                            <Dropdown.Item eventKey="annuale">Annuale</Dropdown.Item>
                        </DropdownButton>
                        <FormControl
                            className={classes.formTrimestriAnno}
                            type="number"
                            placeholder="Inserisci il valore"
                            aria-label="Valore"
                            onChange={() => {
                            }}
                        />
                    </InputGroup>
                    <Button className={classes.bottoneAggiungi} type="submit">Crea Costo</Button>
                </Form>
            </div>
        </div>
    );
}

export default DataEntry;
