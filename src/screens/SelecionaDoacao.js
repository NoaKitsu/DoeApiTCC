import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView, Dimensions, FlatList, Alert } from 'react-native';
import API from '../../API'

import { connect } from 'react-redux'
import { notificacaoVerification} from '../store/actions/notification'

const {height} = Dimensions.get('window')
class SelecionaDoacao extends Component
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
        const OngId = {
            id_ong: this.props.id_ong
        }
        await API.post("/index_ong_notificacoes", OngId).then(
            (res) => { 
                this.setState({ doac: res.data});
        }).catch(
            (err) => {
                Alert.alert('Doe diz:','Não há pedidos de Doações desta instituição! Volte Depois!')
                this.props.navigation.goBack()
            }
        );
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight})
    }

    render(){
        return(
        <SafeAreaView style={styles.mae}>
            
            <View style={styles.areaTxt}>   
                <Text style={styles.textoTop}> Doações da Ong </Text>
            </View> 
            <View style={styles.mae2}>
                <FlatList
                    data={this.state.doac}
                    renderItem={({ item }) => (
                        <View key={item.id_notificacao} style={styles.filha}>
                            <View style={styles.imgContent}>
                                <Image source={{uri: item.ong.imagem_ong }} style={styles.image} />
                            </View> 
                            <View style={styles.txtBtnPosicao}>
                            <Text style={styles.texto} numberOfLines={2}>{item.ong.nome_ong} precisa de {item.categoria.nome_categoria}</Text>
                                <View style={styles.btnArea}>
                                    <TouchableOpacity style={styles.btnStyle}>
                                        <Button 
                                            color= "#EA4779"
                                            title="Ver Mais" 
                                            onPress={() => {
                                                const idNotificacaoValida = {
                                                    id_notificacao: item.id_notificacao
                                                }
                                                try{
                                                    API.post("/index_pk_notificacoes", idNotificacaoValida).then((res) => {
                                                    this.setState({id_notificacao: res.data.id_notificacao})
                                                    this.props.notificacaoVerification({ ...this.state })
                                                    this.props.navigation.navigate('Doacao')   
                                                    });
                                                }
                                                catch(err){
                                                    Alert.alert('Doe diz:','Erro ao verificar API!')
                                                }
                                            }}
                                        /> 
                                    </TouchableOpacity>     
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id_notificacao.toString()}
                />                                   
            </View>
        </SafeAreaView>
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
        notificacaoVerification: notification => dispatch(notificacaoVerification(notification))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelecionaDoacao)


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
        borderLeftColor: "#20232a",
        borderLeftWidth: 4,
        backgroundColor: '#FFF',
        height: '100%',
        width: '65%', //100% com o imgContent

    },
    btnArea:{
        height: '45%', //100% com o texto
        width: '100%',
        marginTop: '0%',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    btnStyle: {
        width: '60%',
        height: '80%',
        marginLeft: '20%',
        marginTop: '0%',
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    btnText: {
        fontSize: 20,
        backgroundColor: "#FFF",
        color: "#FFF",
    },
    texto:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 7,
        height: '55%', //100% com o btnArea
        backgroundColor: '#FFF',
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
        height: 105, //Não pode ser em %, pois o Scroll para de funcionar
        borderColor: "#20232a",
        borderWidth: 4,
        marginTop: '3%',
        marginBottom: '3%',
    },
    imgContent: {
        width: '35%', //100% com o txtBtnPosicao
        backgroundColor: '#FFF'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        
    },
    scroll:{
        flexGrow: 1,
    },
    vazia:{
        height: '10%'
    },  
})