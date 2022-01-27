import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import API from '../../API'

import { connect } from 'react-redux'
import { notificationUndefined } from '../store/actions/notification'

class Doacao extends Component {
    
    constructor(){
        super()

    }

    state = {
        id_notificacao: 'X',
        nome_ong: '',
        noti: [],
        quantidade: '',
    }


    componentDidMount(){
        
        const idNotificaoValida = {
            id_notificacao: this.props.id_notificacao
        }
        API.post("/index_pk_notificacoes", idNotificaoValida).then(
            (res) => { 
                this.setState({ noti: res.data });
                
            }).catch(
                (err) => console.log('Erro ao procurar a ong')
            );
        
    }

    doacao = () => {
        Keyboard.dismiss()
        const Doando = {
            notificacao_doacao: this.props.id_notificacao,
            usuario_doacao: this.props.id_usuario,
            data_doacao: new Date(),
            quantidade_doacao: this.state.quantidade,
            pendente_doacao: true
        }
        if(this.state.quantidade != ''){
            API.post("/doacoes", Doando).then(
                (res) => { 
                    if(res.data.success == "true"){
                        Alert.alert('Doe diz:','Sua Doação foi Confirmada!')
                        this.props.navigation.navigate('Tab')
                    }
                    else{
                        Alert.alert('Doe diz:','Erro ao realizar a pendencia da Doação!')
                        this.props.navigation.goBack()
                    }
                }).catch(
                    (err) => console.log('Erro ao efetivar doacao')
                );
        }
        else{
            Alert.alert('Doe diz:','O campo está vazio!')
        }
    }

    closeDoa = () => {
        Keyboard.dismiss()
        this.props.navigation.goBack()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior='height'
                style={styles.container} >
                <View style={styles.modal}>
                    <View style={styles.descArea}>
                        <Text style={styles.descText} numberOfLines={4}>"{this.state.noti.descricao_notificacao}"</Text>
                    </View>
                    <View style={styles.quantArea}>
                        <Text style={styles.quantText}>Quantidade que deseja doar:</Text>
                    </View>
                    <View style={styles.doacArea}>
                        <View  style={styles.doacCamp}>
                            <TextInput style={styles.textInput} keyboardType='number-pad'
                            onChangeText={quantidade => this.setState({quantidade})}
                            />
                        </View>
                        <View style={styles.doacTextArea}>
                            <Text style={styles.doacText}>{this.state.noti.unidade_notificacao}</Text>
                        </View>
                    </View>
                    <View style={styles.textArea}> 
                        <Text style={styles.textAviso}>*A doação deve ser entregue diretamente na instituição.</Text>

                    </View>
                    <View style={styles.btnArea1}>
                        <TouchableOpacity style={styles.btnModal} onPress={this.doacao}>
                            <Text style={styles.textColor}>Confirma Interesse</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnArea2}>
                        <TouchableOpacity style={styles.buttom} onPress={this.closeDoa}>
                            <Text style={styles.buttomText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = ({ notification, user }) => {
    return {
        id_notificacao: notification.id_notificacao,
        id_usuario: user.id,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        notification_Undefined: () => dispatch(notificationUndefined())
    }
}

export default connect(mapStateToProps, null)(Doacao)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFB6C1',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    modal:{
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 550,
        width: '90%',
        alignItems: 'center',
        padding: '2%'
    },
    descArea: {
        alignItems:'center',
        width: '100%',
        height: 120,
        justifyContent: 'center',
        marginTop: '5%'
    },
    descText: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        fontSize: 22,
        fontWeight: 'bold',
        width: '100%',
        height: '100%',
        backgroundColor: '#EEE',
        padding: '3%'
    },
    quantArea: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantText: {
        fontSize: 20,
    },
    doacArea: {
        height: '17%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    doacCamp: {
        width: '30%',
        height: 80,
        marginLeft: '20%',
    },
    doacTextArea: {
        height: '80%',
        width: '100%',
        marginBottom: '10%',
    },
    doacText: {
        fontSize: 24,
        fontWeight: 'bold',
        width: '70%',
        height: '40%',
        marginLeft: '10%',
        marginTop: '15%',
    },
    textInput:{
        fontSize: 28,
        marginTop: '12%',
        height: '80%',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8, 
        width: '100%',
        justifyContent: 'center',
    },
    textArea: {
        width: '100%',
        height: 80,
        backgroundColor: '#FFF',
    },
    btnModal:{
        marginTop: '9%',
        height: 50,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#11FF11',
        paddingTop: '3%',
    },
    btnArea1: {
        width: '80%',
        height: '10%'
    },  
    textAviso: {
        marginTop: '5%',
        fontWeight:'bold',
        color:'red',
        fontSize:20,
        textAlign:'center',
    },
    textColor: {
        fontSize: 20,
        color: '#FFF'
    }, 
    buttom: {
        marginTop: 30,
        padding: '3%',
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
    btnArea2: {
        width: '100%',
        height: '10%',
        alignItems:'center',
        marginTop:10,
    },
})