import { useContext, useEffect, useState } from "react";
import { Title } from "../../components/title";
import { FundoFormListagem, FundoTitle, RedActionButton, Table } from "../paginaEmpresa/styles";
import { globalContext } from "../../context/context";

export const MinhasAplicacoes = () => {
    const [aplicacoes, setAplicacoes] = useState([]);
    const { state } = useContext(globalContext);

    const handleLoadAplicacoes = async () => {
        const request = await fetch(`http://localhost:8000/aplicacoes/retorna_aplicacoes_candidato?usuario_id=${localStorage.getItem('usuario_id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            },
        });

        const response = await request.json();

        setAplicacoes(response);
        console.log(aplicacoes)
    }

    useEffect(() => {
        handleLoadAplicacoes();
    }, []);

    return (
        <>
            <FundoFormListagem>
                <FundoTitle>
                    <Title>Minhas aplicações</Title>
                </FundoTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome da Vaga</th>
                            <th>Empresa</th>
                            <th>Escolaridade informada</th>
                            <th>Pretensão salarial informada</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aplicacoes.length > 0 ? 
                            aplicacoes.map((aplicacao, index) => (
                                <tr key={index}>
                                    <td>{aplicacao.nome_vaga}</td>
                                    <td>{aplicacao.empresa}</td>
                                    <td>{aplicacao.escolaridade_informada}</td>
                                    <td>{aplicacao.pretensao_salarial_informada}</td>
                                    <td><RedActionButton>Desistir</RedActionButton></td>
                                </tr>
                            ))
                        : null}
                    </tbody>
                </Table>
            </FundoFormListagem>
        </>
    );
}