import React, { useState } from "react";
import { StyledModal, ModalContent, CloseButton } from './styles'; 
import { FloatLabel } from "../FloatLabel";
import { ActionButton, StyledSelect } from "../../pages/paginaEmpresa/styles";

const AplicarVagaModal = ({ isOpen, onClose, vagaId, onAplicar }) => {
    const [pretensaoSalarial, setPretensaoSalarial] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [ultimaEscolaridade, setUltimaEscolaridade] = useState('');

    const handleAplicar = () => {
        const aplicacao = {
            vagaId,
            pretensao_salarial: pretensaoSalarial,
            candidato_escolaridade: ultimaEscolaridade,  
        };
        onAplicar(aplicacao);
        onClose(); 
    };
    if (!isOpen) {
        console.log("Modal não está aberto");
        return null;
    }

    return (
        <StyledModal>
            <ModalContent>
                <CloseButton onClick={onClose}>X</CloseButton>
                <h2>Aplicar para a Vaga</h2>
                <div>
                    <label>Pretensão Salarial*</label>
                    <FloatLabel 
                        type="number" 
                        name="pretensao_salarial" 
                        value={pretensaoSalarial} 
                        onChange={(e) => setPretensaoSalarial(e.target.value)} 
                    />
                </div>
                <br />
                <div>
                    <label>Experiência*</label>
                    <FloatLabel 
                        name="experiencia" 
                        type="text" 
                        value={experiencia} 
                        onChange={(e) => setExperiencia(e.target.value)} 
                    />
                </div>
                <br />
                <div>
                    <label>Última Escolaridade*</label>
                    <StyledSelect 
                        name="faixa_salarial" 
                        value={ultimaEscolaridade}
                        size={'24.5rem'} 
                        onChange={(e) => setUltimaEscolaridade(e.target.value)}
                    >
                        <option value="fundamental">Ensino Fundamental</option>
                        <option value="medio">Ensino Médio</option>
                        <option value="tecnologo">Tecnólogo</option>
                        <option value="superior">Ensino Superior</option>
                        <option value="pos">Pós / MBA / Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                    </StyledSelect>
                </div>
                <br />
                <ActionButton onClick={handleAplicar}>Enviar Aplicação</ActionButton>
            </ModalContent>
        </StyledModal>
    );
};

export default AplicarVagaModal;