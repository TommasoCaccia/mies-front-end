"use client";
import React from 'react';
import Modal from 'react-modal';
import classes from '@/Components/ModalForm/modalForm.module.css'; // Assicurati che il percorso sia corretto

// Imposta l'elemento app per l'accessibilità (usa 'body' oppure aggiungi il div con id appropriato nel RootLayout)
Modal.setAppElement('body');

const ModalForm = ({
                       isOpen,
                       selectedIndex,
                       editRowData,
                       setEditRowData,
                       handleSaveChanges,
                       handleCancel
                   }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCancel}
            contentLabel="Form di Modifica"
            className={classes.modalContent}  // Classe per il contenuto del modale
            overlayClassName={classes.modalOverlay}  // Classe per lo sfondo del modale
        >
            {selectedIndex !== null ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveChanges();
                    }}
                    className={classes.containerFormModifica}
                >
                    <label>
                        Descrizione:
                        <input
                            type="text"
                            value={editRowData.descrizione}
                            onChange={(e) =>
                                setEditRowData({...editRowData, descrizione: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Unità di Misura:
                        <input
                            type="text"
                            value={editRowData.unitaMisura}
                            onChange={(e) =>
                                setEditRowData({...editRowData, unitaMisura: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Trimestre:
                        <input
                            type="text"
                            value={editRowData.trimestre}
                            onChange={(e) =>
                                setEditRowData({...editRowData, trimestre: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Anno:
                        <input
                            type="number"
                            value={editRowData.anno}
                            onChange={(e) =>
                                setEditRowData({...editRowData, anno: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Valore:
                        <input
                            type="number"
                            value={editRowData.costo}
                            onChange={(e) =>
                                setEditRowData({...editRowData, costo: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Categoria:
                        <input
                            type="text"
                            value={editRowData.categoria}
                            onChange={(e) =>
                                setEditRowData({...editRowData, categoria: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Intervallo di Potenza:
                        <input
                            type="text"
                            value={editRowData.intervalloPotenza}
                            onChange={(e) =>
                                setEditRowData({...editRowData, intervalloPotenza: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Classe di Agevolazione:
                        <input
                            type="text"
                            value={editRowData.classeAgevolazione}
                            onChange={(e) =>
                                setEditRowData({...editRowData, classeAgevolazione: e.target.value})
                            }
                        />
                    </label>
                    <label>
                        Anno di Riferimento:
                        <input
                            type="text"
                            value={editRowData.annoRiferimento}
                            onChange={(e) =>
                                setEditRowData({...editRowData, annoRiferimento: e.target.value})
                            }
                        />
                    </label>
                    <div>
                        <button type="submit">Salva modifiche</button>
                        <button type="button" onClick={handleCancel}>Annulla</button>
                    </div>
                </form>
            ) : null}
        </Modal>
    );
};

export default ModalForm;
