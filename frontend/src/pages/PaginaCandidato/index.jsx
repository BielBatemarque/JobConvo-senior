import { NavBar } from "../../components/NavBar";
import { NavItem } from "../../components/NavItem";
import { Outlet } from 'react-router-dom';

export const PaginaDoCandidato = () => {
    return (
        <>
            <NavBar>
                <NavItem text="Vagas"  redirecionamento='/candidato/vagasCandidato' />
                <NavItem text="Minhas Aplicações" redirecionamento="/candidato/minhasAplicacoes"/>
            </NavBar>

            <div style={{ paddingTop: '20px' }}> 
                <Outlet />
            </div>
        </>
    );
}