import React, { Component } from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import API from '../../API'

import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Usuario extends Component{

    state = {
        email: '',
        nome: '',
        id: '',
        numero: '',
    }

    home = () => {
        this.props.navigation.navigate('DrawerRoutes')
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
        if(this.state.nome != ''){
            if(this.state.nome != this.props.nome)
            {
                const alteraNome = {
                    email_usuario: this.props.email,
                    nome_usuario: this.state.nome
                }
                try{
                    API.post("/update_nome_usuarios", alteraNome)
                    .then((res) => {
                        if(res.data.success == "true") {
                            Alert.alert('Doe diz:','Nome Alterado com Sucesso!')
                            this.props.onLogin({ ...this.state })
                            this.props.navigation.goBack()
                        }
                        else {
                            Alert.alert('Doe diz:','Erro ao trocar o nome!')
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                        Alert.alert('Doe diz:','Erro ao trocar o nome na API!')
                    })
                }
                catch(err){
                    Alert.alert('Doe diz:','Erro ao verificar API!')
                }
            }
            else{
                Alert.alert('Doe diz:','Os nomes de usuário continuam iguais!')
            }
        }
        else
        {
            Alert.alert('Doe diz:','Há campos vazios!')
        }
            

    }

    render(){
        return(
            <View style={styles.container}>
            <Text style={{fontSize: 25, marginBottom: 25, fontWeight: "bold"}}>ALTERAÇÃO DE USUÁRIO</Text>
            <TextInput style={styles.textInput} 
                secureTextEntry={true}
                color='#000'
                placeholder='Novo Usuário'
                onChangeText={nome => this.setState({nome})}
                keyboardType='email-address'
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)

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
    }
})