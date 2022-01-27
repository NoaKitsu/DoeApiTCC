import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

const Stack = createStackNavigator();

// imports de paginas
import Users from './pages/Users';
import Rotas from './routes/routes';
import Login from './screens/Login'
import Perfil from './screens/Perfil'
import Cadastro from './screens/Cadastro';
import Esqueci from './screens/EsqueciSenha';
import Informacao from './screens/Informacao';
import Doacao from './screens/Doacao';
import DoacaoNotificacao from './screens/DoacaoNotificacao';
import DoacaoDadosInst from './screens/DoacaoDadosInst';
import SelecionaDoacao from './screens/SelecionaDoacao';
import MostraDoacao from './screens/MostraDoacao';
// import Notificacoes2 from './screens/Notificacoes2';
import Email from './screens/Email';
import Celular from './screens/Celular';
import Senha from './screens/Senha';
import Usuario from './screens/Usuario';
// import DrawerCelular from './screens/Celular';
// import DrawerSenha from './screens/Senha';
// import DrawerUsuario from './screens/Usuario';
// import DrawerRoutes from './routes/routes';

//cria as rotas
export default function Routes() {
  return (
    <Stack.Navigator 
        headerMode= 'none'
        initialRouteName="Login" 
        screenOptions={{ 
            headerTintColor: '#FFF' 
        }
        
        }
    >
    <Stack.Screen 
        name="Login" 
        component={Login}
    />
    <Stack.Screen 
        name="Cadastro" 
        component={Cadastro} 
    />
    <Stack.Screen 
        name="Tab" 
        component={Rotas} 
    />
    <Stack.Screen 
        name="Perfil" 
        component={Perfil} 
    />
    <Stack.Screen 
        name="Esqueci" 
        component={Esqueci} 
    />
    <Stack.Screen 
        name="Informacao" 
        component={Informacao} 
    />
    <Stack.Screen 
        name="Doacao" 
        component={Doacao} 
    />
    <Stack.Screen 
        name="DoacaoNotificacao" 
        component={DoacaoNotificacao} 
    />
    <Stack.Screen 
        name="DoacaoDadosInst" 
        component={DoacaoDadosInst} 
    />
    <Stack.Screen 
        name="SelecionaDoacao" 
        component={SelecionaDoacao} 
    />
    <Stack.Screen 
        name="MostraDoacao" 
        component={MostraDoacao} 
    />
    <Stack.Screen 
        name="Email" 
        component={Email} 
    />
    <Stack.Screen 
        name="Celular" 
        component={Celular} 
    />
    <Stack.Screen 
        name="Senha" 
        component={Senha} 
    />
    <Stack.Screen 
        name="Usuario" 
        component={Usuario} 
    />
    {/* <Stack.Screen 
        name="DrawerRoutes" 
        component={DrawerRoutes} 
    />
    <Stack.Screen 
        name="DrawerCelular" 
        component={DrawerCelular} 
    />
    <Stack.Screen 
        name="DrawerSenha" 
        component={DrawerSenha} 
    />
    <Stack.Screen 
        name="DrawerUsuario" 
        component={DrawerUsuario} 
    /> */}
      
    </Stack.Navigator>
  );
}