import { ONGS_ID_UNDEFINED, ONGS_ID_VERIFICATION } from '../actions/actionTypes'

const initialState = {
    id_ong: 'teste'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ONGS_ID_VERIFICATION:
            return {
                ...state,
                id_ong: action.payload.id_ong
            }
        case ONGS_ID_UNDEFINED:
            return {
                ...state,
                id_ong: null
            }
        default:
            return state        
    }
}

export default reducer;