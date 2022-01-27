import { NOTIFICATION_ID_VERIFICATION, NOTIFICATION_ID_UNDEFINED } from './actionTypes'

export const notificacaoVerification = notification => {
    return {
        type: NOTIFICATION_ID_VERIFICATION,
        payload: notification
    }
}

export const notificacaoUndefined = () => {
    return {
        type: NOTIFICATION_ID_UNDEFINED,
    }
}