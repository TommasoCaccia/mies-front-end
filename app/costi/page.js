"use client";
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import classes from '@/app/costi/page.module.css';

// Mappatura per i nomi dei trimestri e annuale per una visualizzazione più leggibile
const trimestreNames = {
    trimestre1: "Trimestre 1",
    trimestre2: "Trimestre 2",
    trimestre3: "Trimestre 3",
    trimestre4: "Trimestre 4",
    annuale: "Annuale"
};

function DataEntry() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        id: undefined,
        nome: '',
        unitaDiMisura: '',
        valore: '',
        selectedTrimestre: '',
        isAnnualeSet: false
    });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        if (editMode && formData.id != null) {
            const existingItem = data.find(item => item.id === formData.id);
            const isAnnualeSet = !!existingItem?.annuale;
            const selectedTrimestre = Object.keys(trimestreNames).find(key => existingItem[key] != null);
            setFormData(f => ({
                ...f,
                isAnnualeSet,
                selectedTrimestre,
                valore: existingItem[selectedTrimestre] || ''
            }));
        }
    }, [editMode, formData.id, data]);

    const handleInput = (field, event) => {
        const { value } = event.target;
        setFormData({ ...formData, [field]: value });
    };

    const handleSelectTrimestre = (trimestre) => {
        const item = data.find(item => item.id === formData.id);
        setFormData({
            ...formData,
            selectedTrimestre: trimestre,
            valore: item ? item[trimestre] || '' : ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!formData.nome || !formData.unitaDiMisura || !formData.valore || !formData.selectedTrimestre) {
            setError("Tutti i campi sono obbligatori.");
            return;
        }

        let updatedData;
        if (editMode) {
            updatedData = data.map(item => item.id === formData.id ? { ...item, [formData.selectedTrimestre]: formData.valore } : item);
        } else {
            const newItem = { ...formData, id: data.length + 1, [formData.selectedTrimestre]: formData.valore };
            updatedData = [...data, newItem];
        }

        setData(updatedData);
        setFormData({
            id: undefined,
            nome: '',
            unitaDiMisura: '',
            valore: '',
            selectedTrimestre: '',
            isAnnualeSet: false
        });
        setEditMode(false);
    };

    const handleRowSelect = (item) => {
        setError('');
        const isAnnualeSet = !!item.annuale;
        const selectedTrimestre = Object.keys(trimestreNames).find(key => item[key] != null);
        setFormData({
            ...item,
            valore: item[selectedTrimestre] || '',
            selectedTrimestre: selectedTrimestre,
            isAnnualeSet
        });
        setEditMode(true);
    };

    const handleDelete = (itemId) => {
        setData(data.filter(item => item.id !== itemId));
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
    };

    const filteredData = data.filter(item => item.nome.toLowerCase().includes(filterName.toLowerCase()));

    return (
        <div className={`${classes.container} container`}>
            {error && <Alert variant="danger">{error}</Alert>}
            {showFilter && (
                <div className="mb-3">
                    <FormControl className={classes.formNome}
                        placeholder="Filtra per nome"
                        aria-label="Filtra per nome"
                        value={filterName}
                        onChange={handleFilterChange}
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
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.unitaDiMisura}</td>
                                <td>{item.trimestre1 || ''}</td>
                                <td>{item.trimestre2 || ''}</td>
                                <td>{item.trimestre3 || ''}</td>
                                <td>{item.trimestre4 || ''}</td>
                                <td>{item.annuale || ''}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <Button className={classes.bottoneModifica} variant="info" onClick={() => handleRowSelect(item)}>Modifica</Button>
                                    <Button className={classes.bottoneElimina} variant="danger" onClick={() => handleDelete(item.id)}>Elimina</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Nessun dato presente</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
            <div className={classes.formcontainer}>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl className={classes.formNome}
                                     placeholder="Nome"
                                     aria-label="Nome"
                                     value={formData.nome}
                                     onChange={e => handleInput('nome', e)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl className={classes.formUnitadimisura}
                                     placeholder="Unità di Misura"
                                     aria-label="Unità di Misura"
                                     value={formData.unitaDiMisura}
                                     onChange={e => handleInput('unitaDiMisura', e)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            title={trimestreNames[formData.selectedTrimestre] || "Seleziona Trimestre/Annuale"}
                            onSelect={handleSelectTrimestre}
                            className={classes.customDropdownButton}
                        >
                            {editMode && !formData.isAnnualeSet && (
                                <>
                                    <Dropdown.Item eventKey="trimestre1">Trimestre 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="trimestre2">Trimestre 2</Dropdown.Item>
                                    <Dropdown.Item eventKey="trimestre3">Trimestre 3</Dropdown.Item>
                                    <Dropdown.Item eventKey="trimestre4">Trimestre 4</Dropdown.Item>
                                </>
                            )}
                            {editMode && formData.isAnnualeSet && (
                                <Dropdown.Item eventKey="annuale">Annuale</Dropdown.Item>
                            )}
                            {!editMode && (
                                <>
                                    <Dropdown.Item eventKey="trimestre1">Trimestre 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="trimestre2">Trimestre 2</Dropdown.Item>
                                    <Dropdown.Item eventKey="trimestre3">Trimestre 3</Dropdown.Item>
                                    <Dropdown.Item eventKey="trimestre4">Trimestre 4</Dropdown.Item>
                                    <Dropdown.Item eventKey="annuale">Annuale</Dropdown.Item>
                                </>
                            )}
                        </DropdownButton>
                        <FormControl className={classes.formTrimestriAnno}
                                     type="number"
                                     placeholder="Inserisci il valore"
                                     aria-label="Valore"
                                     value={formData.valore}
                                     onChange={e => handleInput('valore', e)}
                        />
                    </InputGroup>
                    <Button className={classes.bottoneAggiungi} type="submit">{editMode ? 'Salva Modifiche' : 'Aggiungi'}</Button>
                </Form>
            </div>
        </div>
    );
}

export default DataEntry;
