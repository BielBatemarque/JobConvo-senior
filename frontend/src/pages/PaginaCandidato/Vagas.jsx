import { useContext, useEffect, useState } from "react";
import { Title } from "../../components/title";
import { ActionButton, FundoFormListagem, FundoTitle, Table } from "../paginaEmpresa/styles";
import { globalContext } from "../../context/context";
import AplicarVagaModal from "../../components/EditModal/AplicarVagaModel";
import { SucssesNotifications, FailNotifications, AtentionNotification } from "../../components/Notifications";

export const CandidatoVagas = () => {
    const [vagas, setVagas] = useState([]);
    const { state } = useContext(globalContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVagaId, setSelectedVagaId] = useState(null);

    useEffect(() => {
        handleLoadVagas();
    }, []);

    const handleLoadVagas = async () => {
        const request = await fetch('http://localhost:8000/vagas/');
        const response = await request.json();
        setVagas(response);
    };

    const openModal = (vagaId) => {
        console.log("Abrindo modal para vaga: ", vagaId);
        setSelectedVagaId(vagaId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedVagaId(null);
    };

    const handleAplicar = async (aplicacao) => {
        const request = await fetch('http://localhost:8000/aplicacoes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify({
                usuario: localStorage.getItem('usuario_id'),
                vaga: aplicacao.vagaId,
                pretensao_salarial: aplicacao.pretensao_salarial,
                candidato_escolaridade: aplicacao.candidato_escolaridade,
            }),
        });

        const response = await request.json();
    
        if (request.ok) {
            SucssesNotifications('Aplicação enviada com sucesso!');
        } else if (request.status === 400){
            AtentionNotification(response.detail);
        } else {
            FailNotifications('Erro ao enviar aplicação.');
        }
    };

    const formatFaixaSalarial = (faixa) => {
        if (faixa.startsWith('acima_')) {
            const valor = faixa.split('_')[1];
            return `Acima de R$ ${valor}`;
        } else if (faixa.includes('_')) {
            const [min, max] = faixa.split('_');
            return `R$ ${min} - R$ ${max}`;
        }
        return faixa;
    };

    return (
        <>
            <FundoFormListagem>
                <FundoTitle>
                    <Title>Lista de Vagas</Title>
                </FundoTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome da Vaga</th>
                            <th>Faixa Salarial</th>
                            <th>Requisitos</th>
                            <th>Escolaridade Mínima</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vagas.length > 0 ?
                            vagas.map((vaga, index) => (
                                <tr key={index}>
                                    <td>{vaga.nome_vaga}</td>
                                    <td>{formatFaixaSalarial(vaga.faixa_salarial)}</td>
                                    <td>{vaga.requisitos}</td>
                                    <td>{vaga.escolaridade_minima}</td>
                                    <td>
                                        <ActionButton onClick={() => openModal(vaga.id)}>Aplicar</ActionButton>
                                    </td>
                                </tr>
                            ))
                        : null}
                    </tbody>
                </Table>
            </FundoFormListagem>

            {/* AplicarVagaModal */}
            <AplicarVagaModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                vagaId={selectedVagaId}
                onAplicar={handleAplicar}
            />
        </>
    );
};