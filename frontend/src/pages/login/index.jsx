import React, { useContext, useState } from 'react';
import { ColumForm, Container, ImageContainer, SemiContainerInputs, StyledButton, StyledImame } from "./styles";
// import { globalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
// import { FailNotifications, SucssesNotifications } from '../../components/Notifications';
import { FloatLabel } from '../../components/FloatLabel';
import { Title } from '../../components/title/index';
export const LoginScreen = () => {
    // const { dispatch } = useContext(globalContext);
    const navigate = useNavigate();

    return (
        <div className="LoginScreen">
            <Container>
                <ImageContainer>
                        {/* <StyledImame src={granito} alt="" /> */}
                </ImageContainer>
                <SemiContainerInputs>
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                    }}>
                        <Title>Stone CO.</Title>
                    </div>

                    <ColumForm method='POST'>

                        <FloatLabel type="text" name="username" text="Nome de Usuário"/>
                        <FloatLabel type='password' text="Senha" required name="password" />

                        <StyledButton type="submit">Entrar</StyledButton>
                    </ColumForm>
                </SemiContainerInputs>
            </Container>
        </div>
    );
};