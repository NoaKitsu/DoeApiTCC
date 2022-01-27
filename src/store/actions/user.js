import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes'

export const login = user => { //user recebe como parametro
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => { //nao recebe param pq nao precisa
    return {
        type: USER_LOGGED_OUT //sem payload pq nao precisa enviar nada
    }
}