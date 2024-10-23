import React, { useEffect, useState } from "react";
import { StyledModal, ModalContent, CloseButton } from './styles'; 

const EditModal = ({ isOpen, onClose, vaga, onSave }) => {
    const [editedVaga, setEditedVaga] = useState(vaga || {});

    useEffect(() => {
        if (vaga) {
            setEditedVaga(vaga);
        }
    }, [vaga]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVaga({ ...editedVaga, [name]: value });
    };

    const handleSave = () => {
        onSave(editedVaga);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <StyledModal>
            <ModalContent>
                <CloseButton onClick={onClose}>X</CloseButton>
                <h2>Editar Vaga</h2>
                <div>
                    <label>Nome*</label>
                    <input 
                        type="text" 
                        name="nome_vaga" 
                        value={editedVaga.nome_vaga} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Faixa Salarial*</label>
                    <select 
                        name="faixa_salarial" 
                        value={editedVaga.faixa_salarial} 
                        onChange={handleChange}
                    >
                        <option value="ate_1000">Até 1.000</option>
                        <option value="1000_2000">De 1.000 a 2.000</option>
                        <option value="2000_3000">De 2.000 a 3.000</option>
                        <option value="acima_3000">Acima de 3.000</option>
                    </select>
                </div>
                <div>
                    <label>Escolaridade Mínima*</label>
                    <select 
                        name="escolaridade_minima" 
                        value={editedVaga.escolaridade_minima} 
                        onChange={handleChange}
                    >
                        <option value="fundamental">Ensino Fundamental</option>
                        <option value="medio">Ensino Médio</option>
                        <option value="tecnologo">Tecnólogo</option>
                        <option value="superior">Ensino Superior</option>
                        <option value="pos">Pós / MBA / Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                    </select>
                </div>
                <div>
                    <label>Requisitos*</label>
                    <input 
                        type="text" 
                        name="requisitos" 
                        value={editedVaga.requisitos} 
                        onChange={handleChange} 
                    />
                </div>
                <button onClick={handleSave}>Salvar</button>
            </ModalContent>
        </StyledModal>
    );
};

export default EditModal;