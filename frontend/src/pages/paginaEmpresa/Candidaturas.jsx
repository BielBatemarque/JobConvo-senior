import { useContext, useEffect, useState } from "react";
import { Title } from "../../components/title";
import { globalContext } from "../../context/context";
import { FundoFormListagem, FundoTitle, Table } from "./styles";

export const Candidaturas = () => {
    const [aplicacoes, setAplicacoes] = useState([]);
    const { state } = useContext(globalContext);

    const handleLoadAplicacoes = async () => {
        const request = await fetch(`http://localhost:8000/aplicacoes/retorna_aplicacoes_empresa?usuario_id=${localStorage.getItem('usuario_id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            }
        });

        const response = await request.json();
        setAplicacoes(response);
    }

    console.log(aplicacoes);

    useEffect(() => {
        handleLoadAplicacoes();
    }, []);

    return (
        <>
        {Object.keys(aplicacoes).length > 0 ? (
                Object.keys(aplicacoes).map((vaga, index) => (
                    <FundoFormListagem key={index}>
                        <FundoTitle>
                            <Title>{vaga}</Title>
                        </FundoTitle>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Candidato</th>
                                    <th>Escolaridade informada</th>
                                    <th>Pretensão salarial informada</th>
                                    <th>Data de aplicação</th>
                                    <th>Perfil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aplicacoes[vaga].map((aplicacao) => (
                                    <tr key={aplicacao.aplicacao_id}>
                                        <td>{aplicacao.candidato}</td>
                                        <td>{aplicacao.candidato_escolaridade}</td>
                                        <td>{aplicacao.pretensao_salarial_informada}</td>
                                        <td>{new Date(aplicacao.data_aplicacao).toLocaleDateString()}</td>
                                        <td>
                                            {aplicacao.pontuacao}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </FundoFormListagem>
                ))
            ) : (
               null
            )}

        </>
    );
};