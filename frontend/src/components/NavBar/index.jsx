import { StyledFlexDiv } from "./styles";
import logo from '../../assets/logo2.png'
import { NavItem } from "../NavItem";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from '../../context/context';
import { SucssesNotifications, FailNotifications } from '../../components/Notifications/index';

export const NavBar = ({children}) => {
    const { dispatch, state } = useContext(globalContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/usuarios/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${state.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch({ type: 'logout' });
                navigate('/');
                SucssesNotifications('Sessão encerrada');
            } else {
                FailNotifications('Falha ao encerrar sessão.');
            }
        } catch (error) {
            FailNotifications('Falha ao encerrar sessão.');
                console.log(error);
        }
    };

   return(
    <>
        <StyledFlexDiv>
            <div>
                <img src={logo} style={{width: '5rem'}} />
            </div>
            {children}
            <NavItem text="Sair" onClick={handleLogout} />
        </StyledFlexDiv>
    </>
   ); 
}