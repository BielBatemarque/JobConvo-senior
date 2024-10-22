import { StyledFlexDiv } from "./styles";
import logo from '../../assets/logo2.png'
import { NavItem } from "../NavItem";

export const NavBar = ({children}) => {

   return(
    <>
        <StyledFlexDiv>
            <div>
                <img src={logo} style={{width: '5rem'}} />
            </div>
            {children}
            <NavItem text="Sair"/>
        </StyledFlexDiv>
    </>
   ); 
}