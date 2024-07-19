"use client"
import React, {useEffect, useState} from 'react';
import {Table, Form, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import {FaFilter} from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

function DataEntry() {
    const [data, setData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterPotenza, setFilterPotenza] = useState('');
    const [filterClasse, setFilterClasse] = useState('');

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

    const aggiungiCosto = async (event) => {
        event.preventDefault(); // Prevenire il comportamento predefinito del form

        const descrizione = event.target.nome ? event.target.nome.value : undefined;
        const unitaMisura = event.target.unitaDiMisura ? event.target.unitaDiMisura.value : undefined;
        const trimestre = event.target.trimestre ? event.target.trimestre.value : undefined;
        const anno = event.target.anno ? event.target.anno.value : undefined;
        const categoria = event.target.categoria ? event.target.categoria.value : undefined;
        const costoS = event.target.valore ? event.target.valore.value : undefined;
        const costo = costoS ? parseFloat(costoS) : undefined;
        const intervalloPotenza = event.target.intervalloDiPotenza ? event.target.intervalloDiPotenza.value : undefined;
        const classeAgevolazione = event.target.classeDiAgevolazione ? event.target.classeDiAgevolazione.value : undefined;

        console.log(descrizione, unitaMisura, trimestre, anno, categoria, costo, intervalloPotenza, classeAgevolazione);

        const response = await fetch('http://localhost:8080/costi/aggiungi', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descrizione,
                unitaMisura,
                trimestre,
                anno,
                costo,
                categoria,
                intervalloPotenza,
                classeAgevolazione
            }),
        });
    }

    const handleFilterCategoria = (e) => {
        setFilterCategoria(e.target.value);
        setFilterPotenza('');
        setFilterClasse('');
    }

    const handleFilterPotenza = (e) => {
        setFilterPotenza(e.target.value);
    }

    const handleFilterClasse = (e) => {
        setFilterClasse(e.target.value);
    }

    const filteredData = data.filter(costo => {
        return (!filterCategoria || costo.categoria === filterCategoria) &&
            (!filterPotenza || costo.tipoTensione === filterPotenza) &&
            (!filterClasse || costo.classeAgevolazione === filterClasse);
    });

    return (
        <div className={`${classes.container} container`}>
            <div className="mb-3 d-flex">
                <FormControl
                    as="select"
                    value={filterCategoria}
                    onChange={handleFilterCategoria}
                    className={classes.formUnitadimisura}
                >
                    <option value="">Filtra per Categoria</option>
                    <option value="dispacciamento">Dispacciamento</option>
                    <option value="trasporti">Trasporti</option>
                    <option value="penali">Penali</option>
                    <option value="oneri">Oneri</option>
                </FormControl>
                {filterCategoria === 'trasporti' && (
                    <FormControl
                        as="select"
                        value={filterPotenza}
                        onChange={handleFilterPotenza}
                        className="ml-3"
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="">Seleziona Intervallo Potenza</option>
                        <option value=">500KW">+500KW</option>
                        <option value="100-500KW">100-500KW</option>
                        <option value="<100KW">-100KW</option>
                    </FormControl>
                )}
                {filterCategoria === 'altro' && (
                    <>
                        <FormControl
                            as="select"
                            value={filterPotenza}
                            onChange={handleFilterPotenza}
                            className="ml-3"
                            style={{ marginLeft: '15px' }}
                        >
                            <option value="">Seleziona Intervallo Potenza</option>
                            <option value=">500KW">+500KW</option>
                            <option value="100-500KW">100-500KW</option>
                            <option value="<100KW">-100KW</option>
                        </FormControl>
                        <FormControl
                            as="select"
                            value={filterClasse}
                            onChange={handleFilterClasse}
                            className="ml-3"
                            style={{ marginLeft: '15px' }}
                        >
                            <option value="">Seleziona Classe di Agevolazione</option>
                            <option value="Val1">Val1</option>
                            <option value="Val2">Val2</option>
                            <option value="Val3">Val3</option>
                            <option value="Val4">Val4</option>
                            <option value="Fat1">Fat1</option>
                            <option value="Fat2">Fat2</option>
                            <option value="Fat3">Fat3</option>
                            <option value="0">0</option>
                        </FormControl>
                    </>
                )}
            </div>
            <div className={classes.tableresponsive}>
                <Table className={classes.tabella} bordered hover>
                    <thead>
                    <tr>
                        <th>Descrizione</th>
                        <th>Unità di Misura</th>
                        <th>Trimestre</th>
                        <th>Anno</th>
                        <th>Valore</th>
                        <th>Categoria</th>
                        <th>Tensione</th>
                        <th>Classe di agevolazione</th>
                        {filteredData.length > 0 && <th>Azioni</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((costo, index) => (
                        <tr key={index}>
                            <td>{costo.descrizione}</td>
                            <td>{costo.unitaMisura}</td>
                            <td>{costo.trimestre}</td>
                            <td>{costo.anno}</td>
                            <td>{costo.costo}</td>
                            <td>{costo.categoria}</td>
                            <td>{costo.tipoTensione}</td>
                            <td>{costo.classeAgevolazione}</td>
                            <td>
                                <Button variant="danger">Elimina</Button>
                            </td>
                        </tr>
                    ))}
                    {filteredData.length === 0 && (<tr>
                        <td colSpan="8">Dati non trovati</td>
                    </tr>)}
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
                            className={classes.formUnitadimisura}
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Seleziona Categoria</option>
                            <option value="dispacciamento">Dispacciamento</option>
                            <option value="trasporti">Trasporti</option>
                            <option value="penali">Penali</option>
                            <option value="oneri">Oneri</option>
                        </FormControl>
                    </InputGroup>
                    {categoria && categoria !== 'dispacciamento' && categoria && categoria !== 'penali' && (
                        <InputGroup className="mb-3">
                            <FormControl
                                as="select"
                                name="intervalloDiPotenza"
                                className={classes.formUnitadimisura}
                            >
                                <option value="">Seleziona Intervallo Potenza</option>
                                <option value=">500KW">+500KW</option>
                                <option value="100-500KW">100-500KW</option>
                                <option value="<100KW"> -100KW</option>
                            </FormControl>
                        </InputGroup>
                    )}
                    {categoria && categoria !== 'dispacciamento' && categoria !== 'trasporti' && categoria && categoria !== 'penali' && (
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
                                <option value="Val4">Val4</option>
                                <option value="Fat1">Fat1</option>
                                <option value="Fat2">Fat2</option>
                                <option value="Fat3">Fat3</option>
                                <option value="0">0</option>
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
