"use client"
import React, { useState } from 'react';
import { Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

function DataEntry() {
    const [data] = useState([]);
    const [formData] = useState({
        id: undefined,
        nome: '',
        unitaDiMisura: '',
        valore: '',
        selectedTrimestre: '',
        isAnnualeSet: false
    });
    const [valoriTrimestrali] = useState({
        trimestre1: '',
        trimestre2: '',
        trimestre3: '',
        trimestre4: ''
    });
    const [editMode] = useState(false);
    const [error] = useState('');
    const [showFilter] = useState(false);
    const [filterName] = useState('');
    const [deleteError] = useState('');

    return (
        <div className={`${classes.container} container`}>
            {error && <Alert variant="danger">{error}</Alert>}
            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
            {showFilter && (
                <div className="mb-3">
                    <FormControl
                        placeholder="Filtra per nome"
                        aria-label="Filtra per nome"
                        value={filterName}
                        onChange={() => {}}
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
                                <FaFilter className={classes.icona} />
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
                    <tr>
                        <td colSpan="8" className="text-center">Nessun dato presente</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            <div className={classes.formcontainer}>
                <Form>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={classes.formNome}
                            placeholder="Nome"
                            aria-label="Nome"
                            value={formData.nome}
                            onChange={() => {}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={classes.formUnitadimisura}
                            placeholder="Unità di Misura"
                            aria-label="Unità di Misura"
                            value={formData.unitaDiMisura}
                            onChange={() => {}}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            className={classes.customDropdownButton}
                            title="Seleziona Trimestre/Annuale"
                            onSelect={() => {}}
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
                            value={formData.valore}
                            onChange={() => {}}
                        />
                    </InputGroup>
                    <Button className={classes.bottoneAggiungi} type="submit">Crea Costo</Button>
                </Form>
            </div>
        </div>
    );
}

export default DataEntry;
