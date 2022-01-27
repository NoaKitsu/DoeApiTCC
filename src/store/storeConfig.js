import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user'
import ongsReducer from './reducers/ongs'
import notificationReducer from './reducers/notification'

const reducers = combineReducers({
    user: userReducer,
    ongs: ongsReducer,
    notification: notificationReducer,
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig