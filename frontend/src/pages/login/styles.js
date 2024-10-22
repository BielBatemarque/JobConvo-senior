import styled from 'styled-components';

export const Container = styled.div`
    width: 80%;
    height: 80vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    box-shadow: 3px 3px 5px gray;
`;

export const SemiContainerInputs = styled.div`
    background-color: white;
    width: 60%;
    position: relative;
    margin: none;
`;

export const ImageContainer = styled.div`
    width: 40%;
    margin: 0;
    position: relative;

`;

export const ColumForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80%;
`;

export const StyledButton = styled.button`
    background-color: rgb(37, 155, 129);
    height: 2.5rem;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px black;
    width:10vw;
    font-size: 1rem;
    padding: 5px;
    cursor: pointer;
    margin-top: 1rem;

    &:hover{
        background-color: rgb(31, 131, 109);
        transition: 0.5s;
    }
`;

export const StyledImame = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const StyledLink = styled.div`
    margin-top: 4rem;
    text-align: center;
    font-size: 0.9rem;

    a {
        color: rgb(37, 155, 129);  
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
            color: rgb(31, 131, 109);  
        }
    }
`;

export const InputStyled = styled.input`
    width: 25vw;
    height: 2rem;
    border: none;
    border-bottom: solid 1px black
`;
