import React, { Component } from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import API from '../../API'
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Telefone extends Component{

    state = {
        email: '',
        numero: '',
        confirmaNumero: '',
        id: '',
        nome: '',
        senhaAntiga: '',
        isValidPassword: true,
        isValidNumber1: true,
        isValidNumber2: true,
    }

    async componentDidMount(){
        this.setState({
            email: this.props.email,
            nome: this.props.nome,
            id: this.props.id,
            numero: this.props.numero,
        })
    }

    alterar = () => {
        if( this.state.numero != '' && 
        this.state.confirmaNumero != '' &&
        this.state.senhaAntiga != ''
        ){
            if(this.handleValidPassword(this.state.senhaAntiga) && this.handleValidNumber1(this.state.numero) && this.handleValidNumber2(this.state.confirmaNumero)){
                const verificaSenha = {
                    senha_usuario: this.state.senhaAntiga,
                    email_usuario: this.props.email
                };    
                try{
                    API.post("/index_verificacao_email_senha_usuarios", verificaSenha).then((res) => {
                        if(res.data.success == "true") {
                            if(this.state.numero == this.state.confirmaNumero)
                            {
                                if(this.state.numero != this.props.numero){
                                    const verificaNumero = {
                                        numero_usuario: this.props.numero,
                                        email_usuario: this.props.email
                                    };
                                    try{
                                        API.post("/index_verificacao_email_numero_usuarios", verificaNumero).then((res) => {
                                            if(res.data.success == "true") {
                                                const alteraNumero = {
                                                    email_usuario: this.props.email,
                                                    numero_usuario: this.state.numero
                                                }
                                                try{
                                                    API.post("/update_numero_usuarios", alteraNumero).then((res) => {
                                                        if(res.data.success == "true") {
                                                            Alert.alert('Doe diz:','Numero Alterado com Sucesso!')
                                                            this.props.onLogin({ ...this.state })
                                                            this.props.navigation.goBack()
                                                        
                                                        }
                                                        else{
                                                            Alert.alert('Doe diz:','Erro ao trocar o numero!')
                                                        };
                                                    }).catch((err) => {
                                                        console.log(err.message)
                                                        Alert.alert('Doe diz:','Erro ao trocar o nome!')
                                                    })
                                                }
                                                catch(err){
                                                    Alert.alert('Doe diz:','Erro ao verificar API 2!')
                                                }
                                            }
                                            else {
                                                Alert.alert('Doe diz:','E-mail e numero antigo não condizem!')
                                            };
                                        }).catch((err) => {
                                            console.log(err.message)
                                            Alert.alert('Doe diz:','Erro ao trocar o nome!')
                                        })
                                    }
                                    catch(err){
                                        Alert.alert('Doe diz:','Erro ao verificar API 1!')
                                    }
                                }
                                else{
                                    Alert.alert('Doe diz:','O numero não é novo!')
                                }
                            }
                            else{
                                Alert.alert('Doe diz:','Os números não condizem!')
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
                    Alert.alert('Doe diz:','Erro ao verificar')
                }    
            }
            else{
                console.log('Validação senha ou celular deu erro')
            }            
        }
        else
        {
            Alert.alert('Doe diz:','Há campos vazios')
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

    handleValidNumber1 = (val1) => {
        if( val1.length >= 10){
            this.setState({
                isValidNumber1: true
            })
            return true
        }
        else {
            this.setState({
                isValidNumber1: false
            })
            return false
        }
    }

    handleValidNumber2 = (val2) => {
        if( val2.length >= 10){
            this.setState({
                isValidNumber2: true
            })
            return true
        }
        else {
            this.setState({
                isValidNumber2: false
            })
            return false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 25, marginBottom: 25, fontWeight: "bold"}}>ALTERAÇÃO DE CELULAR</Text>
                    <TextInput style={styles.textInput}
                        color='#000'
                        placeholder='Celular Novo'
                        onChangeText={numero => this.setState({numero})}
                        keyboardType='number-pad'
                        onEndEditing={(e)=>this.handleValidNumber1(e.nativeEvent.text)}
                    />
                    { this.state.isValidNumber1 ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Número de Celular não Válido ou sem DDD</Text>
                    </Animatable.View>
                    }
                    <TextInput style={styles.textInput}
                        color='#000'
                        placeholder='Confirma Celular Novo'
                        onChangeText={confirmaNumero => this.setState({confirmaNumero})}
                        keyboardType='number-pad'
                        onEndEditing={(e)=>this.handleValidNumber2(e.nativeEvent.text)}
                    />
                    { this.state.isValidNumber2 ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Número de Celular não Válido ou sem DDD</Text>
                    </Animatable.View>
                    }
                    <TextInput style={styles.textInput} 
                        color='#000'
                        placeholder='Atual Senha'
                        onChangeText={senhaAntiga => this.setState({senhaAntiga})}
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

export default connect(mapStateToProps, mapDispatchToProps)(Telefone)

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
        marginTop: 10,
        marginBottom: 5,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        marginRight: 8,
        paddingHorizontal: 8,
        borderRadius: 8, 
        width: 280,
        alignItems: 'center'
    },
    button:{
        borderRadius: 10,
        backgroundColor: "#DCDCDC",
        padding: 5,
        marginTop: 20,
        width: 250,
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