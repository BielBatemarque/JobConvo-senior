import { useContext, useEffect, useState } from "react";
import { FloatLabel } from "../../components/FloatLabel";
import { Title } from "../../components/title";
import { globalContext } from '../../context/context'
import { ActionButton, FormHorizontal, FundoTitle, FundoFormListagem, StyledButton, StyledSelect, Table } from './styles';
import { FailNotifications, SucssesNotifications} from '../../components/Notifications/index';
import EditModal from '../../components/EditModal/index';

export const VagasPage = () => {
    const [vaga, setVaga] = useState({});
    const [vagas, setVagas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVaga, setSelectedVaga] = useState(null);
    const { state } = useContext(globalContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaga({...vaga, [name]: value });
    };

    const handleCadastraVaga = async () => {
        const request = await fetch('http://localhost:8000/vagas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...vaga, empresa: state.usuario_id})
        });
        
        
        if (request.ok){
            SucssesNotifications("Vaga cadastrada com sucesso.");
            setVaga({});
            
            await handleLoadVagas();
        } else {
            FailNotifications('Erro ao cadastrar Vaga');
        }
        
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
    };

    const handleEdit = (vaga) => {
        setSelectedVaga(vaga);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async (vagaEditada) => {
        setIsModalOpen(false);
    
        const request = await fetch(`http://localhost:8000/vagas/${vagaEditada.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vagaEditada),
        });
    
        if (request.ok) {
            SucssesNotifications("Vaga editada com sucesso.");
            await handleLoadVagas();
        } else {
            FailNotifications("Falha ao editar vaga.");
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
    
    
    const handleDelete = async (id) => {
        const request = await fetch(`http://localhost:8000/vagas/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (request.ok){
            SucssesNotifications("Vaga deletada com sucesso.");

            await handleLoadVagas();
        } else {
            FailNotifications("Falha ao deletar vaga.");
        }
    };

    useEffect(() => {
        handleLoadVagas();
    }, []);

    return (
        <>
            <FundoFormListagem>
                <FundoTitle>
                    <Title>Cadastrar Nova Vaga</Title>
                </FundoTitle>
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

                <StyledButton style={{marginTop: '1rem', fontSize: '1rem'}} onClick={() => handleCadastraVaga(vaga)} >Salvar</StyledButton>
            </FundoFormListagem>

            <br />
            <br />

            <FundoFormListagem>
                <FundoTitle>
                    <Title>Listagem de Vagas</Title>
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
                        {vagas.length > 0 ? vagas.map((vaga, index) => (
                            <tr key={index}>
                                <td>{vaga.nome_vaga}</td>
                                <td>{formatFaixaSalarial(vaga.faixa_salarial)}</td>
                                <td>{vaga.requisitos}</td>
                                <td>{vaga.escolaridade_minima}</td>
                                <td>
                                    <ActionButton onClick={() => handleEdit(vaga)}>Editar</ActionButton>
                                    <ActionButton onClick={() => handleDelete(vaga.id)}>Excluir</ActionButton>
                                </td>
                            </tr>
                        )): null}
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