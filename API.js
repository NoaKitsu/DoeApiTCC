// npm install axios
import axios from 'axios'

// Toda vez q chamar essa const ele manda algum tipo de requisição com essa baseUrl
const API = axios.create({
    //pode mudar a porta, mas tbm muda no node
    baseURL: 'http://192.168.0.105:4000'
});

export default API;