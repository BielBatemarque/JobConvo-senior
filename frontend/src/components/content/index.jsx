import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { PaginaDoCandidato } from '../../pages/PaginaCandidato/index';
import { PaginaDaEmpresa } from '../../pages/paginaEmpresa/index';
import { PaginaDeCadastroUsuario } from '../../pages/CadastrarUsuario';
import { ContentEmpresa } from './ContentEmpresa';
import { ContentCandidato } from './ContentCandidato';

export const Content = () => {
    return(
        <Routes>
            {/* Rotas Principais */}
            <Route path="/" element={<LoginScreen />} exact />
            <Route path="/candidato/*" element={<PaginaDoCandidato />}>
                {/* Rotas internas para candidato */}
                <Route path="*" element={<ContentCandidato />} />
            </Route>
            <Route path="/empresa/*" element={<PaginaDaEmpresa />}>
                {/* Rotas internas da empresa */}
                <Route path="*" element={<ContentEmpresa />} />
            </Route>
            <Route path="/cadastrarUsuario/" element={<PaginaDeCadastroUsuario />} />
        </Routes>
    );
}