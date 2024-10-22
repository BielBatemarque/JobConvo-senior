import { NavBar } from "../../components/NavBar"
import { NavItem } from "../../components/NavItem"
import { Outlet } from 'react-router-dom';

export const PaginaDaEmpresa = () => {
    return (
        <>
            <NavBar>
            <NavItem text="Vagas" redirecionamento={'/empresa/vagas'} />
                <NavItem text="Candidaturas" redirecionamento={'/empresa/candidaturas'} />
                <NavItem text="Gráficos" redirecionamento={'/empresa/graficos'} />
            </NavBar>

            {/* O conteúdo será renderizado aqui, abaixo da NavBar */}

            <div style={{ paddingTop: '80px' }}> {/* Espaço para que o conteúdo fique abaixo da NavBar */}
                <Outlet />
            </div>
        </>
    )
}