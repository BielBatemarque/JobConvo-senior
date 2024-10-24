import React, { useState, useEffect, useContext } from "react";
import { Title } from "../../components/title";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';
import { globalContext } from "../../context/context";

Chart.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

export const GraficosPage = () => {
    const { state } = useContext(globalContext);
    const [vagasPorMes, setVagasPorMes] = useState([]);
    const [candidatosPorMes, setCandidatosPorMes] = useState([]);

    const handleLoadVagasPorMes = async () => {
        const request = await fetch(`http://localhost:8000/vagas/vagas_por_mes?empresa_id=${localStorage.getItem('usuario_id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            }
        });
        const response = await request.json();
        const vagasPorMesArray = new Array(12).fill(0);

        const monthIndex = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].indexOf(response.mes);
        
        vagasPorMesArray[monthIndex] = response.vagas_por_mes;
    
        setVagasPorMes(vagasPorMesArray);
    };

    const handleLoadCandidatosMes = async () => {
        const request = await fetch(`http://localhost:8000/aplicacoes/candidatos_por_mes?empresa_id=${localStorage.getItem('usuario_id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`,
            }
        });
        const data = await request.json();
        setCandidatosPorMes(data);
    };

    useEffect(() => {
        handleLoadVagasPorMes();
        handleLoadCandidatosMes();
    }, []);

    const vagasCriadasData = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Vagas Criadas',
                data: vagasPorMes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    const candidatosRecebidosData = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Candidatos Recebidos',
                data: candidatosPorMes, 
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Relatório de Vagas e Candidatos',
            },
        },
    };

    return (
        <div>
            <div style={{ width: '80%', margin: '0 auto', marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '49%' }}>
                    <h3>Vagas Criadas por Mês</h3>
                    <Bar data={vagasCriadasData} options={options} />
                </div>
                <div style={{ width: '49%' }}>
                    <h3>Candidatos Recebidos por Mês</h3>
                    <Bar data={candidatosRecebidosData} options={options} />
                </div>
            </div>
        </div>
    );
};