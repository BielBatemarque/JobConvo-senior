import { useState } from 'react';
import { FloatLabel } from '../../components/FloatLabel';
import { Title } from '../../components/title';
import { FundoPage, CardForm } from './styles';
import { ColumForm, StyledButton, StyledLink } from '../login/styles';
import { useNavigate } from 'react-router-dom';
import { AtentionNotification } from '../../components/Notifications';

export const PaginaDeCadastroUsuario = () => {
    const [usuario, setUsuario] = useState({
        username: '',
        tipo_usuario: 'candidato',
        password: '',
        confirmPassword: '',
    });

    const navegate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'tipo_usuario') {
            setUsuario((prevState) => ({
                ...prevState,
                tipo_usuario: checked ? value : '',
            }));
        } else {
            setUsuario({ ...usuario, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(usuario.password != usuario.confirmPassword){
            AtentionNotification('As senhas não coincidem.');
            return;
        }

        const request = await fetch('http://localhost:8000/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario),
        });

        const response = await request.json();
        

    };

    console.log(usuario);
    return (
        <FundoPage>
            <CardForm>
                <Title>Novo usuário</Title>
                <ColumForm method='POST' onSubmit={handleSubmit}>
                    <FloatLabel
                        type="text"
                        name="username"
                        text="Nome de Usuário"
                        onChange={handleChange}
                    />
                    <FloatLabel
                        type='password'
                        text="Senha"
                        required
                        name="password"
                        onChange={handleChange}
                    />

                    <FloatLabel
                        type='password'
                        text="Confirmar Senha"
                        required
                        name="confirmPassword"
                        onChange={handleChange}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem', marginTop: '1rem', width: '15rem' }}>
                        <label>
                            <input
                                type="checkbox"
                                name="tipo_usuario"
                                value="empresa"
                                checked={usuario.tipo_usuario === 'empresa'}
                                onChange={handleChange}
                            />
                            Empresa
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="tipo_usuario"
                                value="candidato"
                                checked={usuario.tipo_usuario === 'candidato'}
                                onChange={handleChange}
                            />
                            Candidato
                        </label>
                    </div>

                    <StyledButton type="submit">Entrar</StyledButton>

                    <StyledLink>
                        <a onClick={() => navegate('/')}>
                            Voltar
                        </a>
                    </StyledLink>
                </ColumForm>
            </CardForm>
        </FundoPage>
    );
};