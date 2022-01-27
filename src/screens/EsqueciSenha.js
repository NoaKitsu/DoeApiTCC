import React, { Component } from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native'
import API from '../../API'

const PINK = '#df4770'

class Esqueci extends Component
{
    state = {
        email: '',
        novaSenha: '',
    }

    generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    solicitar = () => {
        const validaEmail = {
            email_usuario: this.state.email,
        }
        API.post("/index_email_valida_usuarios", validaEmail).then((res) => {
            if(res.data.success == "true"){
                this.state.novaSenha = this.generatePassword()
                if(this.state.novaSenha != ''){
                    const dadosNovaSenha = {
                        email_usuario: this.state.email,
                        senha_usuario: this.state.novaSenha
                    }
                    API.post("/index_email_esqueci_usuarios", dadosNovaSenha).then((res) => {
                        Alert.alert('Doe diz:','Email enviado')
                        this.props.navigation.navigate('Login')
                    }).catch((err) => {
                        console.log(err.message)
                        Alert.alert('Doe diz:','Erro ao enviar email')
                    })
                }
                else{
                    Alert.alert('Doe diz:','Erro ao gerar Nova Senha')
                }
            }
            else{
                Alert.alert('Doe diz:','Este email não existe')
            }
                
        }).catch((err) => {
            console.log(err.message)
            Alert.alert('Doe diz:','Erro ao achar seu email')
        })
    }

    login = () => {
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='height'
            style={styles.container}>
                <View style={styles.areaView}>
                    <Text style={{fontSize: 25, marginBottom: 25, fontWeight: "bold", color:'#000'}}>Recuperação de Senha</Text>
                    <TextInput placeholder='E-mail de recuperação' style={styles.textInput}
                        placeholderTextColor="#777" 
                        underlineColorAndroid = {PINK} 
                        onChangeText={email => this.setState({email})}
                        keyboardType='email-address'
                    />
                    <TouchableOpacity style={styles.button} onPress={this.solicitar}>
                        <Text style={styles.text}>Solicitar nova senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.login}>
                        <Text style={styles.text}>Retornar ao Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default Esqueci

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems:'center'
    },
    areaView: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput:{
        marginTop: 20,
        width: '80%',
        height: 40,
        fontSize: 20,
    },
    button:{
        borderRadius: 10,
        backgroundColor: "#df4770",
        padding: 10,
        marginTop: 30,
        width: '70%',
        height: 50,
        alignItems: "center"
    },
    text:{
        fontSize: 20,
        color: "#FFF"
    }
})