import { useEffect, useState } from "react";
import { Title } from "../../components/title";
import { ActionButton, FundoFormListagem, FundoTitle, Table } from "../paginaEmpresa/styles";

export const CandidatoVagas = () => {
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        handleLoadVagas();
    }, []);

    const handleLoadVagas = async () => {
        const request = await fetch('http://localhost:8000/vagas/');
        const response = await request.json();

        setVagas(response);
    }

    const handleAplicarVaga = async () => {

    }

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
                        { vagas.length > 0 ?
                            vagas.map((vaga, index) => (
                                <tr key={index}>
                                    <td>{vaga.nome_vaga}</td>
                                    <td>{formatFaixaSalarial(vaga.faixa_salarial)}</td>
                                    <td>{vaga.requisitos}</td>
                                    <td>{vaga.escolaridade_minima}</td>
                                    <td>
                                        <ActionButton onClick={() => handleAplicarVaga()} >Aplicar</ActionButton>
                                    </td>
                                </tr>
                            ))
                        :null}
                    </tbody>
                </Table>
            </FundoFormListagem>
        </>
    );
}