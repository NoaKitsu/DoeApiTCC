import { ONGS_ID_VERIFICATION, ONGS_ID_UNDEFINED } from './actionTypes'

export const idVerification = ongs => {
    return {
        type: ONGS_ID_VERIFICATION,
        payload: ongs
    }
}

export const idUndefined = () => {
    return {
        type: ONGS_ID_UNDEFINED,
    }
}