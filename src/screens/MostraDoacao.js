import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, Alert } from 'react-native';
import API from '../../API'

import { connect } from 'react-redux'
import { notificacaoVerification} from '../store/actions/notification'

const {height} = Dimensions.get('window')
class MostraDoacao extends Component
{
    constructor()
    {
        super();
    }

    state= {
        screenHeight: 0,
        doac: [],
        id_notificacao: '',
    }

    async componentDidMount(){
        const DoacaoId = {
            usuario_doacao: this.props.id
        }
        await API.post("/index_usuario_doacoes", DoacaoId).then(
            (res) => { 
                this.setState({ doac: res.data});
        }).catch(
            (err) => {
                Alert.alert('Doe diz:','Você não realizou Doações! Doe!')
                this.props.navigation.goBack()
            }
        );
    }

    dateFormat = (e) => {
        let today = new Date(e)
        let date = parseInt(today.getDate()+1) + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
        return date
    }

    situacaoValida = (e) => {
        if(e != true) {
            let resposta = "entregue"
            return resposta
        }
        else {
            let resposta = "pendente"
            return resposta
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight})
    }

    render(){
        return(
        <SafeAreaView style={styles.mae}>
            
            <View style={styles.areaTxt}>   
                <Text style={styles.textoTop}>Suas Doações</Text>
            </View> 
            <View style={styles.mae2}>
                <FlatList
                    data={this.state.doac}
                    renderItem={({ item }) => (
                        <View key={item.id_notificacao} style={styles.filha}>
                            <View style={styles.txtBtnPosicao}>
                                <Text style={styles.texto} numberOfLines={2}>
                                    Você Doou {item.quantidade_doacao} {item.notificacao.unidade_notificacao} de {item.notificacao.categoria.nome_categoria} para {item.notificacao.ong.nome_ong}
                                </Text>
                                <View style={styles.downArea}>
                                    <Text style={styles.texto2} numberOfLines={1}>
                                        Dia: {this.dateFormat(item.data_doacao)}
                                    </Text>
                                    {/* <Text style={styles.sitStyle} >
                                        Situação: {this.situacaoValida(item.pendente_doacao)}
                                    </Text>      */}
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id_doacao.toString()}
                />                                   
            </View>
        </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        id: user.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        notificacaoVerification: notification => dispatch(notificacaoVerification(notification))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostraDoacao)


const styles = StyleSheet.create({
    mae:{
        backgroundColor: '#e4648c',
        padding: '5%',
        width: '100%',
        height: '100%',
    },
    mae2:{
        flexDirection: 'column',
        backgroundColor: 'transparent',
        flexGrow: 1,
        width: '105%',
        height: '20%',
        alignItems: 'center',
    },
    txtBtnPosicao:{
        flexDirection: 'column',
        backgroundColor: '#FFF',
        height: '100%',
        width: '100%',

    },
    downArea:{
        height: '50%', //100% com o texto
        width: '100%',
        marginTop: '0%',
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    sitStyle: {
        width: '30%',
        height: '70%',
        marginLeft: '10%',
        marginTop: '0%',
        backgroundColor: "#FFF",
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 20,
        backgroundColor: "#FFF",
        color: "#FFF",
    },
    texto:{
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: '2%',
        height: '50%', //100% com o btnArea
        backgroundColor: '#FFF',
    },
    texto2:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '2%',
        height: '55%', //100% com o btnArea
        backgroundColor: '#FFF',
        width: '50%',
    },
    areaTxt: {
        width: '100%',
        height: '6%',
        alignItems: 'center',
        backgroundColor: '#e4648c'
    },
    textoTop:{
        fontSize: 24,
        fontWeight: 'bold',

    },
    filha: {
        backgroundColor: '#777',
        flexDirection: 'row',
        width: '95%',
        height: 145, //Não pode ser em %, pois o Scroll para de funcionar
        borderColor: "#20232a",
        borderWidth: 4,
        marginTop: '3%',
        marginBottom: '3%',
    },
    scroll:{
        flexGrow: 1,
    },
    vazia:{
        height: '10%'
    },
    
})