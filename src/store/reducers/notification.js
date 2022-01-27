import { NOTIFICATION_ID_UNDEFINED, NOTIFICATION_ID_VERIFICATION } from '../actions/actionTypes'

const initialState = {
    id_notificacao: 'teste'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_ID_VERIFICATION:
            return {
                ...state,
                id_notificacao: action.payload.id_notificacao
            }
        case NOTIFICATION_ID_UNDEFINED:
            return {
                ...state,
                id_notificacao: null
            }
        default:
            return state        
    }
}

export default reducer;