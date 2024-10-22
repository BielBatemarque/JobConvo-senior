import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { PaginaDoCandidato } from '../../pages/PaginaCandidato/index';
import { PaginaDaEmpresa } from '../../pages/paginaEmpresa/index';
import { PaginaDeCadastroUsuario } from '../../pages/CadastrarUsuario';

export const Content = () => {
    return(
        <Routes>
        {/* Rotas Princípais*/}
            <Route path='/' element={<LoginScreen />}  exact/>
            <Route path='/candidato/home' element={<PaginaDoCandidato />} />
            <Route path='/empresa/home' element={<PaginaDaEmpresa />} />
            <Route path='/cadastrarUsuario/' element={ <PaginaDeCadastroUsuario />} />
        </Routes>
    );
}