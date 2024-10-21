import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';

export const Content = () => {
    return(
        <Routes>
        {/* Rotas Princípais*/}
            <Route path='/' element={<LoginScreen />}  exact/>
        </Routes>
    );
}