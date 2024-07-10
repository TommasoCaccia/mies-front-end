"use client"
import React, {useEffect, useState} from 'react';
import {Table, Form, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import {FaFilter} from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

export default DataEntry;

function DataEntry() {
    const [data, setData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        const fetchCosti = async () => {
            try {
                const response = await fetch('http://localhost:8080/costi', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error('Errore durante il fetch:', response.statusText);
                }
            } catch (error) {
                console.error('Errore di rete:', error);
            }
        };

        fetchCosti();
    }, []);

    const aggiungiCosto = async (e) => {
        e.preventDefault();

        const descrizione = e.target.nome ? e.target.nome.value : null;
        const unitaMisura = e.target.unitaDiMisura ? e.target.unitaDiMisura.value : null;
        const trimestre = e.target.trimestre ? e.target.trimestre.value : 0;
        const anno = e.target.anno ? e.target.anno.value : null;
        const categoria = e.target.categoria ? e.target.categoria.value : null;
        const costoS = e.target.valore ? e.target.valore.value : null;
        const costo = costoS ? parseFloat(costoS) : null;

        console.log({descrizione, unitaMisura, trimestre, anno, costo, categoria});

        try {
            const response = await fetch('http://localhost:8080/costi/aggiungi', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({descrizione, unitaMisura, trimestre, anno, costo, categoria}),
            });

            if (response.ok) {
                console.log("Costo aggiunto con successo");
                // Resetta il form dopo aver aggiunto il costo
                e.target.reset();
                // Aggiorna la lista dei costi (opzionale, se vuoi mostrare immediatamente il nuovo costo)
                const newCosti = await response.json();
                setData(newCosti);
                window.location.replace('/costi');
            } else {
                console.error('Errore durante il fetch:', response.statusText);
            }
        } catch (error) {
            console.error('Errore di rete:', error);
        }
    };

    return (
        <div className={`${classes.container} container`}>
            {showFilter && (
                <div className="mb-3">
                    <FormControl
                        placeholder="Filtra per nome"
                        aria-label="Filtra per nome"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>
            )}
            <div className={classes.tableresponsive}>
                <Table className={classes.tabella} bordered hover>
                    <thead>
                    <tr>
                        <th>
                            Descrizione
                            <Button
                                variant="link"
                                className="p-0 ml-2"
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <FaFilter className={classes.icona}/>
                            </Button>
                        </th>
                        <th>Unità di Misura</th>
                        <th>Trimestre</th>
                        <th>Anno</th>
                        <th>Valore</th>
                        <th>Categoria</th>
                        {data.length > 0 && <th>Azioni</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((costo, index) => (
                        <tr key={index}>
                            <td>{costo.descrizione}</td>
                            <td>{costo.unitaMisura}</td>
                            <td>{costo.trimestre !== 0 ? costo.trimestre : ''}</td>
                            <td>{costo.anno}</td>
                            <td>{costo.costo}</td>
                            <td>{costo.categoria}</td>
                            <td>
                                <Button variant="danger">Elimina</Button>
                            </td>
                        </tr>
                    ), (<div>Dati non trovati </div>))}
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
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={classes.formUnitadimisura}
                            placeholder="Unità di Misura"
                            aria-label="Unità di Misura"
                            name="unitaDiMisura"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="mr-2"
                            type="number"
                            placeholder="Numero Trimestre"
                            aria-label="Trimestre"
                            name="trimestre"
                            defaultValue="0"
                        />
                        <InputGroup.Text>o</InputGroup.Text>
                        <FormControl
                            className="ml-2"
                            type="text"
                            placeholder="Anno"
                            aria-label="Anno"
                            name="anno"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            as="select"
                            name="categoria"
                            className={classes.formCategoria}
                        >
                            <option value="">Seleziona Categoria</option>
                            <option value="dispacciamento">Dispacciamento</option>
                            <option value="trasporti">Trasporti</option>
                            <option value="speseMateria">Spese materia</option>
                            <option value="energia">Energia</option>
                            <option value="altro">Altro</option>
                        </FormControl>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Valore"
                            aria-label="Valore"
                            name="valore"
                        />
                    </InputGroup>
                    <Button className={classes.bottoneAggiungi} type="submit">Crea Costo</Button>
                </Form>
            </div>
        </div>
    );
}