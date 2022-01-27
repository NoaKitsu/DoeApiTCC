import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import API from '../../API'

import { connect } from 'react-redux'
import { idUndefined } from '../store/actions/ongs'

class Informacao extends Component {
    
    constructor(){
        super()
    }

    state = {
        id_ong: 'X',
        cep_ong: '',
        nome_ong: '',
        info: [],
    }

    componentDidMount(){
        this.setState({cep_ong: 'Vazio'})
        const idValida = {
            id_ong: this.props.id_ong
        }
        API.post("/index_id_cep_ongs", idValida).then(
            (res) => { 
                this.setState({ info: res.data });
                this.setState({ nome_ong: res.data.nome_ong });    
        }).catch(
            (err) => console.log('Erro ao procurar a ong')
        );
    }

    closeInfo = () => {
        this.props.id_Undefined()
        this.props.navigation.goBack()
    }

    goDoacao = () => {
        this.props.navigation.navigate('DoacaoNotificacao')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.fundo}>
                    <View style={styles.nomeOng}>
                        <Text style={styles.textoNome}>{this.state.nome_ong}</Text>
                    </View>
                    <View style={styles.modal}>
                        <View style={styles.modalCentro1}>
                            <Text style={styles.text}>Número: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.numero_ong}</Text>
                        </View>
                        <View style={styles.modalCentro3}>
                            <Text style={styles.text}>E-mail: </Text>
                            <Text style={styles.texto} numberOfLines={2}>{this.state.info.email_ong}</Text>
                        </View>
                        <View style={styles.modalCentro1}>
                            <Text style={styles.text}>Cidade: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.cidade_ong}</Text>
                        </View>
                        <View style={styles.modalCentro2}>
                            <Text style={styles.text}>Endereço: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.endereco_ong}</Text>
                        </View>
                        <View style={styles.modalCentro1}>
                        <Text style={styles.text}>Cep: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.cep_ong}</Text>
                        </View>
                        <View style={styles.modalCentro1}>
                        <Text style={styles.text}>Banco: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.banco_ong}</Text>
                        </View>
                        <View style={styles.modalCentro1}>
                            <Text style={styles.text}>Número da Conta: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.num_conta_ong}</Text>
                        </View>
                        <View style={styles.modalCentro1}>
                            <Text style={styles.text}>Agência: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.agencia_ong}</Text>
                        </View>
                        <View style={styles.modalCentro1}>
                            <Text style={styles.text}>Tipo Conta: </Text>
                            <Text style={styles.texto} numberOfLines={1}>{this.state.info.tipo_conta_ong}</Text>
                        </View>
                        <View style={styles.modalCentro2}>
                            <Text style={styles.text}>Descrição: </Text>
                            <Text style={styles.texto} numberOfLines={3}>{this.state.info.descricao_ong}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.goDoacao}
                        style={styles.buttom}>
                        <Text style={styles.buttomText}>Continuar a Doação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.closeInfo}
                        style={styles.buttom2}>
                        <Text style={styles.buttomText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ ongs }) => {
    return {
        id_ong: ongs.id_ong
    }
}

const mapDispatchToProps = dispatch => {
    return {
        id_Undefined: () => dispatch(idUndefined())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Informacao)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    fundo:{
        backgroundColor: '#FFB6C1',
        flex:1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    },
    nomeOng:{
        backgroundColor: '#fff',
        width: '80%',
        height: '6%',
        marginTop: '8%',
        borderRadius: 10,
        alignItems: 'center',
        padding: '2.5%'
    },
    modal:{
        backgroundColor: '#fff',
        width: '80%',
        height: '60%',
        marginTop: '10%',
        padding: '7%',
        borderRadius: 10,
    },
    modalCentro1:{
        backgroundColor: '#FFF',
        width: '70%',
        height: '6%',
        borderRadius: 10,
        flexDirection: 'row',
    },
    modalCentro2:{
        backgroundColor: '#FFF',
        width: '100%',
        height: '12%',
        borderRadius: 10,
    },
    modalCentro3:{
        backgroundColor: '#FFF',
        width: '100%',
        height: '18%',
        borderRadius: 10,
    },
    textoNome:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#FFF',
        color: '#F11',
    },
    texto:{
        fontSize: 18,
        fontWeight: 'bold',
        width: '100%',
        backgroundColor: 'transparent',
    },
    buttom: {
        marginTop: '10%',
        padding: '3%',
        backgroundColor: '#df4770',
        width: '60%',
        height: 50,
        alignItems: 'center',
        borderRadius: 6,
    },
    buttom2: {
        marginTop: '5%',
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
    }
})