import { Routes, Route } from 'react-router-dom';
import { CandidatoVagas } from '../../pages/PaginaCandidato/Vagas'
import { MinhasAplicacoes } from '../../pages/PaginaCandidato/MinhasAplicacoes';

export const ContentCandidato = () => {
    return (
        <Routes>
            <Route path="vagasCandidato" element={<CandidatoVagas />} />
            <Route path="minhasAplicacoes" element={<MinhasAplicacoes />} />
        </Routes>
    );
};