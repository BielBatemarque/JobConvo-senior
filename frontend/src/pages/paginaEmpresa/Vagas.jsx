import { useContext, useEffect, useState } from "react";
import { FloatLabel } from "../../components/FloatLabel";
import { Title } from "../../components/title";
import { globalContext } from '../../context/context'
import { ActionButton, FormHorizontal, FuncoTitle, FundoFormListagem, StyledButton, StyledSelect, Table } from './styles';
import EditModal from '../../components/EditModal/index'; // Importando a modal

export const VagasPage = () => {
    const [vaga, setVaga] = useState({});
    const [vagas, setVagas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVaga, setSelectedVaga] = useState(null);
    const { state } = useContext(globalContext);
    console.log(state);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaga({...vaga, [name]: value });
    };

    const handleCadastraVaga = async () => {
        // Implementar lógica para cadastrar vaga
    };

    const handleLoadVagas = async () => {
        const request = await fetch('http://localhost:8000/vagas/retorna_vagas_empresa/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'empresa_id': state.usuario_id,
            })
        });
        const response = await request.json();
        setVagas(response);
        console.log(response);
    };

    const handleEdit = (vaga) => {
        setSelectedVaga(vaga);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async (vaga) => {
        // Implementar lógica para atualizar vaga no backend
        setIsModalOpen(false);
        await handleLoadVagas(); // Recarregar vagas após a edição
    };
    
    const handleDelete = async (id) => {
        // Implementar lógica para excluir vaga
    };

    useEffect(() => {
        handleLoadVagas();
    }, []);

    return (
        <>
            <FundoFormListagem>
                <FuncoTitle>
                    <Title>Cadastrar Nova Vaga</Title>
                </FuncoTitle>
                <FormHorizontal>
                    <div style={{ textAlign: 'start' }}>
                        <label htmlFor="nome_vaga">Nome*</label>
                        <FloatLabel text="Nome da vaga" name="nome_vaga" onChange={handleChange}/>
                    </div>

                    <div style={{ textAlign: 'start' }}>
                        <label htmlFor="faixa_salarial">Faixa salarial*</label>
                        <br />
                        <StyledSelect onChange={handleChange} name="faixa_salarial" style={{marginTop: '13px'}}>
                            <option value="ate_1000">Até 1.000</option>
                            <option value="1000_2000">De 1.000 a 2.000</option>
                            <option value="2000_3000">De 2.000 a 3.000</option>
                            <option value="acima_3000">Acima de 3.000</option>
                        </StyledSelect>
                    </div>

                    <div style={{ textAlign: 'start' }}>
                        <label htmlFor="faixa_salarial">Escolaridade Mínima*</label>
                        <br />
                        <StyledSelect onChange={handleChange} name="escolaridade_minima" style={{marginTop: '13px'}}>
                            <option value="fundamental">Ensino Fundamental</option>
                            <option value="medio">Ensino Médio</option>
                            <option value="tecnologo">Tecnólogo</option>
                            <option value="superior">Ensino Superior</option>
                            <option value="pos">Pós / MBA / Mestrado</option>
                            <option value="doutorado">Doutorado</option>
                        </StyledSelect>
                    </div>

                    <div style={{ textAlign: 'start' }}>
                        <label htmlFor="requisitos">Requisitos*</label>
                        <FloatLabel text="Requisitos" name="requisitos" onChange={handleChange} />
                    </div>

                </FormHorizontal>

                <StyledButton style={{marginTop: '1rem'}} onClick={() => handleCadastraVaga(vaga)} >Salvar</StyledButton>
            </FundoFormListagem>

            <br />
            <br />

            <FundoFormListagem>
                <FuncoTitle>
                    <Title>Listagem de Vagas</Title>
                </FuncoTitle>
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
                        {vagas.map((vaga, index) => (
                            <tr key={index}>
                                <td>{vaga.nome_vaga}</td>
                                <td>{vaga.faixa_salarial}</td>
                                <td>{vaga.requisitos}</td>
                                <td>{vaga.escolaridade_minima}</td>
                                <td>
                                    <button onClick={() => handleEdit(vaga)}>Editar</button>
                                    <button onClick={() => handleDelete(vaga.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </FundoFormListagem>

            {/* Modal de edição */}
            <EditModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                vaga={selectedVaga} 
                onSave={handleSaveEdit} 
            />
        </>
    );
};