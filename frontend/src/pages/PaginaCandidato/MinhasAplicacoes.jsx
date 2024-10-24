import { useContext, useEffect, useState } from "react";
import { Title } from "../../components/title";
import { FundoFormListagem, FundoTitle, Table } from "../paginaEmpresa/styles";
import { globalContext } from "../../context/context";

export const MinhasAplicacoes = () => {
    const [aplicacoes, setAplicacoes] = useState([]);
    const { state } = useContext(globalContext);

    const handleLoadAplicacoes = async () => {
        const request = await fetch(`http://localhost:8000/aplicacoes/retorna_aplicacoes_candidato?usuario_id=${state.usuario_id}`, {
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
                </Table>
            </FundoFormListagem>
        </>
    );
}