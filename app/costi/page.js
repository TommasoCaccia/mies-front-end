"use client"
import React, {useEffect, useState} from 'react';
import {Table, Button, FormControl} from 'react-bootstrap';
import classes from '@/app/costi/page.module.css';

function DataEntry() {
    const [data, setData] = useState([]);
    const [filterCategoria, setFilterCategoria] = useState('');
    const [filterPotenza, setFilterPotenza] = useState('');
    const [filterClasse, setFilterClasse] = useState('');

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        try {
            const response = await fetch('http://localhost:8080/costi/upload', {
                method: 'POST', body: formData,
            });

            if (response.ok) {
                setMessage('File uploaded successfully!');
            } else {
                setMessage('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error occurred during file upload.');
        }
    };


    useEffect(() => {
        setMessage('');
        const fetchCosti = async () => {
            try {
                const response = await fetch('http://localhost:8080/costi', {
                    method: 'GET', credentials: 'include', headers: {
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
        return (!filterCategoria || costo.categoria === filterCategoria) && (!filterPotenza || costo.tipoTensione === filterPotenza) && (!filterClasse || costo.classeAgevolazione === filterClasse);
    });

    return (<div className={`${classes.container} container`}>
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
            {filterCategoria === 'trasporti' && (<FormControl
                as="select"
                value={filterPotenza}
                onChange={handleFilterPotenza}
                className="ml-3"
                style={{marginLeft: '10px'}}
            >
                <option value="">Seleziona Intervallo Potenza</option>
                <option value=">500KW">+500KW</option>
                <option value="100-500KW">100-500KW</option>
                <option value="<100KW">-100KW</option>
            </FormControl>)}
            {filterCategoria === 'oneri' && (<>
                <FormControl
                    as="select"
                    value={filterPotenza}
                    onChange={handleFilterPotenza}
                    className="ml-3"
                    style={{marginLeft: '15px'}}
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
                    style={{marginLeft: '15px'}}
                >
                    <option value="">Seleziona Classe di Agevolazione</option>
                    <option value="Val">Val1</option>
                    <option value="Fat1">Fat1</option>
                    <option value="Fat2">Fat2</option>
                    <option value="Fat3">Fat3</option>
                    <option value="0">0</option>
                </FormControl>
            </>)}
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
                    <th>Intevallo di Potenza</th>
                    <th>Classe di agevolazione</th>
                    {filteredData.length > 0 && <th>Azioni</th>}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((costo, index) => (<tr key={index}>
                    <td>{costo.descrizione}</td>
                    <td>{costo.unitaMisura}</td>
                    <td>{costo.trimestre}</td>
                    <td>{costo.anno}</td>
                    <td>{costo.costo}</td>
                    <td>{costo.categoria}</td>
                    <td>{costo.intervalloPotenza}</td>
                    <td>{costo.classeAgevolazione}</td>
                    <td>
                        <Button variant="danger">Elimina</Button>
                    </td>
                </tr>))}
                {filteredData.length === 0 && (<tr>
                    <td colSpan="8">Dati non trovati</td>
                </tr>)}
                </tbody>
            </Table>
        </div>
        <div className={classes.formContainer}>
            <h2 className={classes.h2}>Upload Excel File</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.fileInput}>
                    <label htmlFor="file-upload" className={classes.fileLabel}>
                        Scegli file
                    </label>
                    <input onChange={handleFileChange} type="file" accept=".xlsx,.xls" id="file-upload"
                           className={classes.file}/>
                    <span className="fileName">Nessun file selezionato</span>
                </div>
                <button type="submit" className={classes.uploadButton}>UPLOAD</button>
                <p>{message}</p>
            </form>
        </div>
    </div>);
}

export default DataEntry;
