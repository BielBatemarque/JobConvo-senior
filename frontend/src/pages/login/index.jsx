import React, { useContext, useState } from 'react';
import { ColumForm, Container, ImageContainer, SemiContainerInputs, StyledButton, StyledImame } from "./styles";
// import { globalContext } from '../../context/context';
// import { useNavigate } from 'react-router-dom';
import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FloatLabel } from '../../components/FloatLabel';
import { Title } from '../../components/title/index';
import { toast } from 'react-toastify';
import logo2 from '../../assets/logo2.png';
export const LoginScreen = () => {
    // const navigate = useNavigate();

    const [login, setLogin] = useState({});

    const handleLogin = async (event) => {
        event.preventDefault();

        const request = await fetch('http://localhost:8000/usuarios/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        });

        
        const response = await request.json();
        console.log(response);

        if (request.ok){
            SucssesNotifications(response.detail);
        }else {
            FailNotifications(response.detail);
        }
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({...login, [name]: value});
    }

    console.log(login)

    return (
        <div className="LoginScreen">
            <Container>
                <ImageContainer>
                        <StyledImame src={logo2} alt="" />
                </ImageContainer>
                <SemiContainerInputs>
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                    }}>
                        <Title>Python App</Title>
                    </div>

                    <ColumForm method='POST' onSubmit={handleLogin}>

                        <FloatLabel type="text" name="username" text="Nome de Usuário" onChange={handleChange}/>
                        <FloatLabel type='password' text="Senha" required name="password" onChange={handleChange}/>
                        <StyledButton type="submit">Entrar</StyledButton>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
};