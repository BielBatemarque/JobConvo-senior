import styled from "styled-components";

export const FundoTitle = styled.div`
    width: 100%;
    background-color: #04c49c;
    margin: 0 auto;
    color: white;
    text-align: start;
    height: 3rem;
    align-items: center;
    display: flex;
`;

export const FundoFormListagem = styled.div`
    border: 10px black;
    background-color: #f5f5f5; /* Alterado para cinza claro */
    height: auto;
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
`;

export const FormHorizontal = styled.form`
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    width: 80%;
    margin-top: 1rem;
    gap: 1rem;
`;

export const StyledSelect = styled.select`
    border-radius: 5px;
    width: ${(props) => (props.size ? props.size : '22rem')};
    height: 3.2rem;
    background-color: white;
`;

export const StyledButton = styled.button`
    width: 100%;
    border-radius: 5px;
    height: 35px;
    cursor: pointer;
    padding: 0px;
    border: none;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    text-align: left;
    font-size: 1rem;

    thead {
        background-color: #04c49c;
        color: white;
    }

    th, td {
        padding: 0.75rem;
        border: 1px solid #ddd;
    }

    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tbody tr:hover {
        background-color: #f1f1f1;
    }
`;

export const ActionButton = styled.button`
    background-color: #04c49c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #039c82;
    }

    & + & {
        margin-left: 5px; 
    }
`;

export const RedActionButton = styled(ActionButton)`
    background-color: #e74c3c; 
    
    &:hover {
        background-color: #c0392b;
    }
`;

export const Pontuacao = styled.span`
    cursor: pointer;
    color: ${(props) => {
        if (props.pontuacao === 0) return "red";
        if (props.pontuacao === 1) return "blue";
        if (props.pontuacao === 2) return "green";
        return "black";
    }};
`;