import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import API from '../../API'

import { connect } from 'react-redux'
import { logout } from '../store/actions/user'

class Perfil extends Component {

    state = {
        userDados: [],
    }

    logout = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Login')
    }

    selectDoacoes = () => {
        this.props.navigation.navigate('MostraDoacao')
    }

    alterarDados = () => {
        this.props.navigation.openDrawer()
    }

    async componentDidMount(){
        const idValida = {
            id_usuario: this.props.id,
        }
        await API.post("/index_pk_usuarios", idValida).then(
            (res) => { this.setState({ userDados: res.data});
        }).catch(
            (err) => console.log('Erro ao procurar os Dados')
        );
    }

    render() {
        const options = { email: this.props.email, secure: true }
        return (
            <View style={styles.container}>
                <View style={styles.gravatarArea}>
                    <Gravatar options={options} style={styles.avatar} />
                </View>
                <View style={styles.nicknameArea}>
                    <Text style={styles.nickname}>{this.props.nome}</Text>
                </View>
                <View style={styles.dadosArea}>
                    <Text style={styles.dadosTexto}>Email:</Text>
                    <Text style={styles.dados} numberOfLines={2}>{this.props.email}</Text>
                    <Text style={styles.dadosTexto}>Número:</Text>
                    <Text style={styles.dados2} numberOfLines={1}>{this.props.numero}</Text>
                </View>
                <TouchableOpacity onPress={this.selectDoacoes}
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>Minhas Doações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.alterarDados}
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>Alterar Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logout}
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        nome: user.nome,
        id: user.id,
        numero: user.numero,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    gravatarArea: {
        width: '80%',
        height: '32%',
        marginTop: '10%',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: '20%',
    },
    nicknameArea: {
        width: '80%',
        height: '7%',
        alignItems: 'center',
        backgroundColor: '#FFF',
        
    },
    nickname: {
        marginTop: '0%',
        fontSize: 30,
        fontWeight: 'bold'
    },
    dadosArea: {
        width: '80%',
        height: '20%',
        marginTop: '0%',
        backgroundColor: '#FFF',
        padding: '2%',
    },
    dadosTexto: {
        fontSize: 20,
    },
    dados: {
        fontSize: 18,
        height: '40%',
        backgroundColor: '#FFF',
    },
    dados2: {
        fontSize: 18
    },
    buttom: {
        marginTop: 20,
        padding: 9,
        backgroundColor: '#df4770',
        width: '60%',
        height: 45,
        alignItems: 'center',
        borderRadius: 6,
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    }
})