import React, { Component } from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import API from '../../API'
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Email extends Component{

    state = {
        email: '',
        confirmaEmail: '',
        nome: '',
        id: '',
        numero: '',
        senha: '',
        isValidPassword: true,
    }

    async componentDidMount(){
        this.setState({
            email: this.props.email,
            nome: this.props.nome,
            id: this.props.id,
            numero: this.props.numero,
        })
    }

    alterar = (e) => {
        e.preventDefault();
        if(this.state.emailNovo != '' && 
        this.state.confirmaEmail != '' &&
        this.state.senha
        ){
            if(this.handleValidPassword(this.state.senha)){
                const verificaSenha = {
                    senha_usuario: this.state.senha,
                    email_usuario: this.props.email
                };
                try{
                    API.post("/index_verificacao_email_senha_usuarios", verificaSenha).then((res) => {
                        if(res.data.success == "true") {
                            if(this.state.emailNovo == this.state.confirmaEmail)
                            {
                                if(this.props.email != this.state.emailNovo){
                                    const verificaEmail = {
                                        email_usuario: this.state.emailNovo
                                    };    
                                    try{
                                        API.post("/index_email_valida_usuarios", verificaEmail).then((res) => {
                                            if(res.data.succes == "true") {
                                                Alert.alert('Doe diz:','E-mail já existe!')
                                            }
                                            else {
                                                const alteraEmail = {
                                                    id_usuario: this.props.id,
                                                    email_usuario: this.state.emailNovo
                                                }
                                                try{
                                                    API.post("/update_email_usuarios", alteraEmail).then((res) => {
                                                        if(res.data.success == "true") {
                                                            Alert.alert('Doe diz:','Email Alterado com Sucesso!')
                                                            this.setState({email: this.state.emailNovo})
                                                            this.props.onLogin({ ...this.state })
                                                            this.props.navigation.goBack()
                                                        
                                                        }
                                                        else{
                                                            Alert.alert('Doe diz:','Erro ao trocar o e-mail!')
                                                        };
                                                    }).catch(error => {
                                                        console.log(error.res)
                                                        Alert.alert('Doe diz:','Erro ao trocar o e-mail')
                                                    });
                                                }
                                                catch(err){
                                                    Alert.alert('Doe diz:','Erro ao verificar API 2!')
                                                }
                                            };
                                        }).catch(error => {
                                            console.log(error.res)
                                            
                                        });
                                    }
                                    catch(err){
                                        Alert.alert('Doe diz:','Erro ao verificar API 1!')
                                    }
                                }
                                else{
                                    Alert.alert('Doe diz:','O email está igual!')
                                }
                            }
                            else{
                                Alert.alert('Doe diz:','Os e-mails novos não condizem!')
                            }
                        }
                        else {
                            Alert.alert('Doe diz:','Senha Atual está errada!')
                        };
                    }).catch(error => {
                        console.log(error.res)
                    });
                }
                catch(err){
                    Alert.alert('Doe diz:','Erro ao verificar!')
                }
            }
            else{
                console.log('Validação senha deu erro')
            } 
        }
        else
        {
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

    render(){
        return(
            <View style={styles.container}>
            <Text style={{fontSize: 25, marginBottom: 25, fontWeight: "bold"}}>ALTERAÇÃO DE E-MAIL</Text>
            <TextInput style={styles.textInput} 
                color='#000'
                placeholder='Novo E-mail'
                onChangeText={emailNovo => this.setState({emailNovo})}
                keyboardType='email-address'
            />
            <TextInput style={styles.textInput}
                color='#000'
                placeholder='Confirmação do Novo E-mail'
                onChangeText={confirmaEmail => this.setState({confirmaEmail})}
                keyboardType='email-address'
            />
            <TextInput style={styles.textInput} 
                color='#000'
                placeholder='Atual Senha'
                onChangeText={senha => this.setState({senha})}
                secureTextEntry={true}
                onEndEditing={(e)=>this.handleValidPassword(e.nativeEvent.text)}
            />
            { this.state.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Senha menor que 8 caracteres</Text>
            </Animatable.View>
            }
            <TouchableOpacity style={styles.button} onPress={this.alterar}>
                <Text style={styles.text}>Alterar</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        numero: user.numero,
        id: user.id,
        nome: user.nome,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#F494Af",
        justifyContent: 'center',
        alignItems:'center'
    },
    textInput:{
        fontSize: 17,
        padding: 10,
        marginBottom: 15,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        marginRight: 8,
        paddingHorizontal: 8,
        borderRadius: 8, 
        width: '80%'
    },
    button:{
        borderRadius: 10,
        backgroundColor: "#DCDCDC",
        padding: 5,
        marginTop: 20,
        width: '70%',
        alignItems: "center"
    },
    text:{
        fontSize: 25,
        color: "#000"
    },
    errorMsg: {
        color: '#FF1111',
    }
})