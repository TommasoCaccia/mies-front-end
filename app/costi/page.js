"use client"
import React, { useState } from 'react';
import { Table, Form, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

function DataEntry() {
    const [data] = useState([]);
    const [formData, setFormData] = useState({
        id: undefined,
        nome: '',
        unitaDiMisura: '',
        valore: '',
        trimestre: '',
        anno: ''
    });
    const [editMode] = useState(false);
    const [error] = useState('');
    const [showFilter] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [deleteError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                        onChange={(e) => setFilterName(e.target.value)}
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
                        <th>Trimestre o Anno</th>
                        <th>Valore</th>
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
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={classes.formUnitadimisura}
                            placeholder="Unità di Misura"
                            aria-label="Unità di Misura"
                            name="unitaDiMisura"
                            value={formData.unitaDiMisura}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="mr-2"
                            type="number"
                            placeholder="Numero Trimestre"
                            aria-label="Trimestre"
                            name="trimestre"
                            value={formData.trimestre}
                            onChange={handleInputChange}
                        />
                        <InputGroup.Text>O</InputGroup.Text>
                        <FormControl
                            className="ml-2"
                            type="number"
                            placeholder="Anno"
                            aria-label="Anno"
                            name="anno"
                            value={formData.anno}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="number"
                            placeholder="Valore"
                            aria-label="Valore"
                            name="valore"
                            value={formData.valore}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    <Button className={classes.bottoneAggiungi} type="submit">Crea Costo</Button>
                </Form>
            </div>
        </div>
    );
}

export default DataEntry;
