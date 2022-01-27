import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import API from '../../API'

import { connect } from 'react-redux'
import { idVerification } from '../store/actions/ongs'

class Instituicao extends Component
{
    constructor()
    {
        super();
    }

    state= {
        screenHeight: 0,
        id_ong: 'X',
        inst: [],
    }

    async componentDidMount(){
        await API.post("/index_ongs").then(
            (res) => { this.setState({ inst: res.data.ongs});
        }).catch(
            (err) => console.log('Erro ao procurar instituições')
        );
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight})
        
    }

    render(){
        return(
        <SafeAreaView style={styles.mae}>
            <View style={styles.areaTxt}>   
                <Text style={styles.textoTop}> Instituições </Text>
            </View> 
            
                <View style={styles.mae2}>
                    <FlatList
                        data={this.state.inst}
                        renderItem={({ item }) => (
                            <View key={item.id_ong} style={styles.filha}>
                                <View style={styles.imgContent}>
                                    <Image source={{uri: item.imagem_ong }} style={styles.image} />
                                </View> 
                                <View style={styles.txtBtnPosicao}>
                                <Text style={styles.texto} numberOfLines={2}> {item.nome_ong} </Text>
                                    <View style={styles.btnArea}>
                                        <TouchableOpacity style={styles.btnStyle} >
                                            <Button 
                                                color= "#EA4779"
                                                title="Ver Mais" 
                                                onPress={() => {
                                                    const CepOngValida = {
                                                        cep_ong: item.cep_ong
                                                    }
                                                    
                                                    try{
                                                        API.post("/index_cep_ongs", CepOngValida).then((res) => {
                                                        
                                                        this.setState({id_ong: res.data.id_ong})
                                                        this.props.id_Verification({ ...this.state })
                                                        this.props.navigation.navigate('Informacao')
                                                            
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
                        keyExtractor={(item) => item.email_ong}
                    />
			    </View>
        </SafeAreaView>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        id_Verification: ongs => dispatch(idVerification(ongs))
    }
}

export default connect(null, mapDispatchToProps)(Instituicao)

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

