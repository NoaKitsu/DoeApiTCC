import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import API from '../../API'
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux'
import { login } from '../store/actions/user'


const PINK = '#df4770'

class Login extends Component
{
    state = {
        nome: 'X',
        email: '',
        senha: '',
        id: '',
        numero: '',
        isValidUser: true,
        isValidPassword: true,
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.email != '' && this.state.senha != '') {
            if(this.handleValidPassword(this.state.senha)){
                
                try{
                    const validaEmail = {
                        email_usuario: this.state.email,
                    }
                    API.post("/index_email_valida_usuarios", validaEmail).then((res) => {
                        if(res.data.success == "true"){
                            const login = {
                                email_usuario: this.state.email,
                                senha_usuario: this.state.senha,
                            };
                            API.post("/login", login).then((res) => {
                                if(res.data.success == "true") {
                                    try{
                                        API.post("/index_email_usuarios", validaEmail).then((res) => {
                                            this.setState({nome: res.data.nome_usuario})
                                            this.setState({id: res.data.id_usuario})
                                            this.setState({numero: res.data.numero_usuario})
                                            this.props.onLogin({ ...this.state })
                                            this.props.navigation.navigate('Tab')
                                        }).catch(error => {
                                            console.log(error.res)
                                            Alert.alert('Doe diz:','Erro ao pegar os dados!')
                                        });
                                    }
                                    catch(err){
                                        Alert.alert('Doe diz:','Erro ao verificar API 2!')
                                    }
                                }
                                else {
                                    Alert.alert('Doe diz:','Email ou senha não condizem!')
                                };
                            }).catch(error => {
                                Alert.alert('Doe diz:','Erro ao fazer o login!')
                            });
                        }
                        else{
                            Alert.alert('Doe diz:','Email não existe!')
                        }
                    }).catch(error => {
                        Alert.alert('Doe diz:','Erro ao validar o email!')
                    });
                }
                catch(err){
                    Alert.alert('Doe diz:','Erro ao verificar API 1!')
                }
            }
            else{
                console.log('Validação deu erro')
            }
        }
        else {
            Alert.alert('Doe diz:','Há campos vazios!')
            
        }
    }

    Cadastro = () => {
        this.props.navigation.navigate('Cadastro')
    }

    Esqueci = () => {
        this.props.navigation.navigate('Esqueci')
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

    render() {
        return(
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} behavior='height'>
                <KeyboardAvoidingView behavior='height'
            style={styles.areaLogin} >
                    <Text style={styles.textoPag}>Login</Text>
                    <TextInput placeholder='Email' style={styles.input}
                        placeholderTextColor="#777" 
                        underlineColorAndroid = {PINK} 
                        onChangeText={email => this.setState({email})}
                        keyboardType='email-address'
                    />

                    <TextInput placeholder='Senha' style={styles.input}
                        placeholderTextColor="#777" 
                        underlineColorAndroid = {PINK} 
                        onChangeText={senha => this.setState({senha})}
                        secureTextEntry={true} 
                        onEndEditing={(e)=>this.handleValidPassword(e.nativeEvent.text)}
                    />
                    { this.state.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Senha menor que 8 caracteres</Text>
                    </Animatable.View>
                    }
                    <TouchableOpacity style={styles.buttom} onPress={this.handleSubmit}>
                        <Text style={styles.buttomText} 
                        >Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttom} onPress={this.Cadastro}>
                        <Text style={styles.buttomText}
                        >Criar nova conta</Text>
                    </TouchableOpacity>
                    <Text style={styles.buttomText2}
                    onPress={this.Esqueci}>Esqueci minha senha</Text>
                   
                   </KeyboardAvoidingView>
                </View>
                </TouchableWithoutFeedback>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)

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
    areaLogin: {
        width: '100%',
        marginBottom: '55%',
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
        borderRadius: 6,
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    buttom2: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#FFF',
        
        width: 200,
        height: 50,
        alignItems: 'center'
    },
    buttomText2: {
        fontSize: 20,
        color: '#4d75f7',
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    input: {
        marginTop: 20,
        width: '90%',
        height: 40,
        fontSize: 20,
    },
    errorMsg: {
        color: '#FF1111',
    }
})

