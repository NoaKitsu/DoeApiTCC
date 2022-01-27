import React, { Component } from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import API from '../../API'
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Senha extends Component{

    state = {
        senhaAntiga: '',
        senhaNova: '',
        confirmaSenha: '',
        email: '',
        nome: '',
        id: '',
        numero: '',
        isValidPassword1: true,
        isValidPassword2: true,
        isValidPassword3: true,
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
        if(this.state.senhaAntiga != '' && 
        this.state.senhaNova != '' && 
        this.state.confirmaSenha != ''
        ){
            if(this.handleValidPassword1(this.state.senhaAntiga) && this.handleValidPassword2(this.state.senhaNova) && this.handleValidPassword3(this.state.confirmaSenha)){
                if(this.state.senhaNova == this.state.confirmaSenha)
                {
                    const verificaSenha = {
                        senha_usuario: this.state.senhaAntiga,
                        email_usuario: this.props.email
                    };    
                    try{
                        API.post("/index_verificacao_email_senha_usuarios", verificaSenha).then((res) => {
                            if(res.data.success == "true") {
                                const alteraSenha = {
                                    email_usuario: this.props.email,
                                    senha_usuario: this.state.senhaNova
                                }
                                try{
                                    API.post("/update_senha_usuarios", alteraSenha).then((res) => {
                                        if(res.data.success == "true") {
                                            Alert.alert('Doe diz:','Senha Alterada com Sucesso!')
                                            this.props.navigation.goBack()
                                        }
                                        else{
                                            Alert.alert('Doe diz:','Erro ao trocar o numero!')
                                        };
                                    }).catch(error => {
                                        console.log(error.res)
                                        Alert.alert('Doe diz:','Erro ao trocar o numero na API!')
                                    });
                                }
                                catch(err){
                                    Alert.alert('Doe diz:','Erro ao verificar API 2!')
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
                        Alert.alert('Doe diz:','Erro ao verificar API 1!')
                    }
                }
                else{
                    Alert.alert('Doe diz:','As novas senhas não condizem!')
                }
            }
            else
            {
                console.log('Validações deu erro')
            }     
        }
        else{
            Alert.alert('Doe diz:','Há campos vazios!')
        }
            

    }

    handleValidPassword1 = (val) => {
        if( val.length >= 8){
            this.setState({
                isValidPassword1: true
            })
            return true
        }
        else {
            this.setState({
                isValidPassword1: false
            })
            return false
        }
    }

    handleValidPassword2 = (val) => {
        if( val.length >= 8){
            this.setState({
                isValidPassword2: true
            })
            return true
        }
        else {
            this.setState({
                isValidPassword2: false
            })
            return false
        }
    }

    handleValidPassword3 = (val) => {
        if( val.length >= 8){
            this.setState({
                isValidPassword3: true
            })
            return true
        }
        else {
            this.setState({
                isValidPassword3: false
            })
            return false
        }
    }

    render(){
        return(
            <View style={styles.container}>
            <Text style={{fontSize: 25, marginBottom: 20, fontWeight: "bold"}}>ALTERAÇÃO DE SENHA</Text>
            <TextInput style={styles.textInput} 
                color='#000'
                placeholder='Atual Senha'
                onChangeText={senhaAntiga => this.setState({senhaAntiga})}
                secureTextEntry={true}
                onEndEditing={(e)=>this.handleValidPassword1(e.nativeEvent.text)}
            />
            { this.state.isValidPassword1 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Senha menor que 8 caracteres</Text>
            </Animatable.View>
            }
            <TextInput style={styles.textInput} 
                color='#000'
                placeholder='Nova Senha'
                onChangeText={senhaNova => this.setState({senhaNova})}
                secureTextEntry={true}
                onEndEditing={(e)=>this.handleValidPassword2(e.nativeEvent.text)}
            />
            { this.state.isValidPassword2 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Senha menor que 8 caracteres</Text>
            </Animatable.View>
            }
            <TextInput style={styles.textInput}
                color='#000'
                placeholder='Confirmação da Nova Senha'
                onChangeText={confirmaSenha => this.setState({confirmaSenha})}
                secureTextEntry={true}
                onEndEditing={(e)=>this.handleValidPassword3(e.nativeEvent.text)}
            />
            { this.state.isValidPassword3 ? null :
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

export default connect(mapStateToProps, mapDispatchToProps)(Senha)

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
        marginBottom: 5,
        marginTop: 10,
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
        marginTop: 25,
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