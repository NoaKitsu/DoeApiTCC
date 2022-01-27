import { createStore } from 'redux';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes'

const initialState = {
    nome: null,
    email: null,
    id: null,
    numero: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                nome: action.payload.nome,
                email: action.payload.email,
                id: action.payload.id,
                numero: action.payload.numero
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                nome: null,
                email: null,
                id: null,
                numero: null
            }
        default:
            return state        
    }
}

export default reducer;