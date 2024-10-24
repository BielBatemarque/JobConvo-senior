import { useContext, useEffect, useState } from "react";
import { Title } from "../../components/title";
import { FundoFormListagem, FundoTitle, RedActionButton, Table } from "../paginaEmpresa/styles";
import { globalContext } from "../../context/context";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";

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

    const handleDesistirAplicacao = async (id) => {
        const request = await fetch(`http://localhost:8000/aplicacoes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            }
        });   
        if(request.ok){
            SucssesNotifications("Desistiu da Vaga");

            await handleLoadAplicacoes();
        } else {
            FailNotifications('Erro ao tentar desistir');
        }
    }

    const formatarSalario = (valor) => {
        if (valor !== null && valor !== undefined) {
            const numero = parseFloat(valor);
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(numero);
        }
        return 'R$ 0,00';
    };

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
                                    <td>{formatarSalario(aplicacao.pretensao_salarial_informada)}</td>
                                    <td><RedActionButton onClick={() => handleDesistirAplicacao(aplicacao.apicacao_id)}>Desistir</RedActionButton></td>
                                </tr>
                            ))
                        : null}
                    </tbody>
                </Table>
            </FundoFormListagem>
        </>
    );
}