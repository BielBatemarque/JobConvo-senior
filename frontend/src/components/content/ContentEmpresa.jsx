import { Routes, Route } from 'react-router-dom';
import { VagasPage } from '../../pages/paginaEmpresa/Vagas';
import { Candidaturas } from '../../pages/paginaEmpresa/Candidaturas';
import { GraficosPage } from '../../pages/paginaEmpresa/Graficos';

export const ContentEmpresa = () => {
    return (
        <Routes>
            <Route path="vagas" element={<VagasPage />} />
            <Route path="candidaturas" element={<Candidaturas />} />
            <Route path="graficos" element={<GraficosPage />} />
        </Routes>
    );
};