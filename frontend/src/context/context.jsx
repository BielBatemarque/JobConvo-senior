import React, { useReducer } from "react";

const initialState = {
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    tipo: localStorage.getItem('tipo') || '',
    usuario_id: localStorage.getItem('usuario_id') || '',
};

export const globalContext = React.createContext(initialState);

export const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <globalContext.Provider value={{ state, dispatch }}>{children}</globalContext.Provider>
    );
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'autentication':
            localStorage.setItem('token', action.payload);
            localStorage.setItem('username', action.username);
            localStorage.setItem('tipo', action.tipo);
            localStorage.setItem('usuario_id', action.usuario_id)

            return {
                ...state,
                token: action.payload,
                username: action.username,
                tipo: action.tipo
            };

        case 'logout':
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('tipo');

            return {
                ...state,
                token: '',
                username: '',
                tipo: '',
            };

        default:
            return { ...state };
    }
};