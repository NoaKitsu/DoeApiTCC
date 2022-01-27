import React, { Component } from 'react'
import API from '../../API'
import * as Animatable from 'react-native-animatable';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native'

const PINK = '#df4770'

class Cadastro extends Component {
    state = {
        nome: '',
        numero: '',
        email: '',
        senha: '',
        isValidUser: true,
        isValidPassword: true,
        isValidNumber: true,
    }

    login = () => {
        this.props.navigation.navigate('Login')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.nome != ''
            && this.state.numero != ''
            && this.state.email != '' 
            && this.state.senha != '') {
            if(this.handleValidPassword(this.state.senha) && this.handleValidNumber(this.state.numero)){
                const dadosUsuario = {
                    nome_usuario: this.state.nome,
                    numero_usuario: this.state.numero,
                    email_usuario: this.state.email,
                    senha_usuario: this.state.senha
                };
                API.post("/usuarios", dadosUsuario).then((res) => {
                    if(res.data.success == "true") {
                        this.props.navigation.navigate('Login')
                        Alert.alert('Doe diz:','Cadastrado com sucesso!')
                    }
                    else {
                        console.log(res)
                        Alert.alert('Doe diz:','Problema ao Cadastrar!')
                    };
                });
            }
            else{
                console.log('Erro ao Verificar Consistencia')
            }
        }
        else {
            Alert.alert('Doe diz:','Há campos vazios!')
        }
    }

    handleValidPassword = (val) => {
        if( val.length >= 8){
            this.setState({
                isValidPassword: true
            })
            return true
        }
        else {
            this.setState({
                isValidPassword: false
            })
            return false
        }
    }

    handleValidNumber = (val) => {
        if( val.length >= 10){
            this.setState({
                isValidNumber: true
            })
            return true
        }
        else {
            this.setState({
                isValidNumber: false
            })
            return false
        }
    }

    render() {
        return (
        
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='height'
                    style={styles.areaCadastro} >
                        <Text style={styles.textoPag}>Cadastro</Text>
                        <TextInput placeholder='Usuário' style={styles.input}
                            placeholderTextColor="#777" 
                            underlineColorAndroid = {PINK}
                            keyboardType='email-address'
                            value={this.state.nome}
                            onChangeText={nome => this.setState({ nome })} />
                        <TextInput placeholder='Número de Celular' style={styles.input}
                            placeholderTextColor="#777" 
                            underlineColorAndroid = {PINK} keyboardType='number-pad'
                            value={this.state.numero}
                            onChangeText={numero => this.setState({ numero })} 
                            onEndEditing={(e)=>this.handleValidNumber(e.nativeEvent.text)}/> 
                        { this.state.isValidNumber ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Número de Celular não Válido ou sem DDD</Text>
                        </Animatable.View>
                        }         
                        <TextInput placeholder='Email' style={styles.input}
                            placeholderTextColor="#777" 
                            underlineColorAndroid = {PINK}
                            keyboardType='email-address'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })} />
                        <TextInput placeholder='Senha' style={styles.input}
                            placeholderTextColor="#777" 
                            underlineColorAndroid = {PINK}
                            secureTextEntry={true} value={this.state.senha}
                            onChangeText={senha => this.setState({ senha })}
                            onEndEditing={(e)=>this.handleValidPassword(e.nativeEvent.text)} />
                        { this.state.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Senha menor que 8 caracteres</Text>
                        </Animatable.View>
                        }    
                        <TouchableOpacity onPress={this.handleSubmit} style={styles.buttom}>
                            <Text style={styles.buttomText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.login} style={styles.buttom}>
                            <Text style={styles.buttomText}>Voltar ao Login</Text>
                        </TouchableOpacity>
                        </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default Cadastro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFF",
    },
    textoPag: {
        fontSize: 32,
        color: '#000',
        flex: 1,
        marginTop: '30%',
        fontWeight: "bold"
    },
    areaCadastro: {
        width: '100%',
        marginBottom: '30%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#df4770',
        width: '60%',
        height: 50,
        alignItems: 'center',
        borderRadius: 6
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        height: 40,
        fontSize: 18
    },
    errorMsg: {
        color: '#FF1111',
    },
})