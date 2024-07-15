"use client"
import React, {useEffect, useState} from 'react';
import {Table, Form, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import {FaFilter} from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

function DataEntry() {
    const [data, setData] = useState([]);
    const [showFilter] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [categoria, setCategoria] = useState('');

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

    const aggiungiCosto = async () => {
        const descrizione = event.target.nome ? event.target.nome.value : undefined;
        const unitaMisura = event.target.unitaDiMisura ? event.target.unitaDiMisura.value : undefined;
        const trimestre = event.target.trimestre ? event.target.trimestre.value : undefined;
        const anno = event.target.anno ? event.target.anno.value : undefined;
        const categoria = event.target.categoria ? event.target.categoria.value : undefined;
        const costoS = event.target.valore ? event.target.valore.value : undefined;
        const costo = costoS ? parseFloat(costoS) : undefined;


        console.log(descrizione, unitaMisura, trimestre, anno, categoria, costo)

        const response = await fetch('http://localhost:8080/costi/aggiungi', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({descrizione, unitaMisura, trimestre, anno, costo, categoria}),
        });
    }

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
                        {data.length > 0 && <th>Azioni</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((costo, index) => (
                        <tr key={index}>
                            <td>{costo.descrizione}</td>
                            <td>{costo.unitaMisura}</td>
                            <td>{costo.trimestre}</td>
                            <td>{costo.anno}</td>
                            <td>{costo.costo}</td>
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
                        />
                        <InputGroup.Text>o</InputGroup.Text>
                        <FormControl
                            className="ml-2"
                            type="number"
                            placeholder="Anno"
                            aria-label="Anno"
                            name="anno"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            as="select"
                            name="categoria"
                            className={classes.formUnitadimisura}
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Seleziona Categoria</option>
                            <option value="dispacciamento">Dispacciamento</option>
                            <option value="trasporti">Trasporti</option>
                            <option value="speseMateria">Spese per Materia Energia</option>
                            <option value="altro">Altro</option>
                        </FormControl>
                    </InputGroup>
                    {categoria && categoria !== 'dispacciamento' && (
                        <InputGroup className="mb-3">
                            <FormControl
                                as="select"
                                name="tipoDiTensione"
                                className={classes.formUnitadimisura}
                            >
                                <option value="">Seleziona Tipo di Tensione</option>
                                <option value="altaTensione">Alta Tensione</option>
                                <option value="mediaTensione">Media Tensione</option>
                                <option value="bassaTensione">Bassa Tensione</option>
                            </FormControl>
                        </InputGroup>
                    )}
                    {categoria && categoria !== 'dispacciamento' && categoria && categoria !== 'trasporti' && (
                        <InputGroup className="mb-3">
                            <FormControl
                                as="select"
                                name="classeDiAgevolazione"
                                className={classes.formUnitadimisura}
                            >
                                <option value="">Seleziona Classe di Agevolazione</option>
                                <option value="Val1">Val1</option>
                                <option value="Val2">Val2</option>
                                <option value="Val3">Val3</option>
                                <option value="Fat1">Fat1</option>
                            </FormControl>
                        </InputGroup>
                    )}
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

export default DataEntry;