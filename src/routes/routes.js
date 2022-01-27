  
import React from 'react';
import { Text, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Instituicao from '../screens/Instituicao';
import Login from '../screens/Login';
import Senha from '../screens/Senha';
import Celular from '../screens/Celular';
import Usuario from '../screens/Usuario';
import Perfil from '../screens/Perfil';
import Email from '../screens/Email';
import Notificacoes from '../screens/Notificacoes'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// const YourComponent = props => (
// <Text> Wildcard {this.props.navigation.state.params} {...props}</Text>
// )

// function Wildcard({ title }) {
//   return <Text>Wildcard {title}</Text>
// }

export default function Routes() {
  return (
		<Drawer.Navigator drawerContentOptions={{activeTintColor:"#e4648c"}} initialRouteName="Página Inicial">
			<Drawer.Screen name="Página Inicial" component={TabNavigator} 
				options={{drawerIcon: config => <MaterialCommunityIcons name= "charity" size={20} color="#e4648c"/>}} />
			<Drawer.Screen name="Alterar Usuário" component={Usuario} 
				options={{drawerIcon: config => <MaterialCommunityIcons name= "rename-box" size={20} color="#e4648c"/>}} />
			<Drawer.Screen name="Alterar Celular" component={Celular}
				options={{drawerIcon: config => <MaterialCommunityIcons name= "phone" size={20} color="#e4648c"/>}} />
			<Drawer.Screen name="Alterar Senha" component={Senha} 
				options={{drawerIcon: config => <MaterialCommunityIcons name= "pencil-lock" size={20} color="#e4648c"/>}} />
			<Drawer.Screen name="Alterar E-mail" component={Email}
				options={{drawerIcon: config => <MaterialCommunityIcons name= "email" size={20} color="#e4648c"/>}} />
		</Drawer.Navigator>
		);
	}

	function TabNavigator() {
		return (
		<Tab.Navigator
		initialRouteName={Instituicao}
		tabBarOptions={{
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
		}}
		>
			<Tab.Screen name="Instituições" component={Instituicao} 
			options={{
			tabBarLabel: 'Instituições',
			tabBarIcon: ({ color }) => (
				<MaterialCommunityIcons name="home" color={color} size={26} />
			),
			}}
			/>
			<Tab.Screen name="Notificações" component={Notificacoes} 
			options={{
			tabBarLabel: 'Notificações',
			tabBarIcon: ({ color }) => (
				<MaterialCommunityIcons name="bell" color={color} size={26} />
			),
			}}
			/>
			<Tab.Screen name="Perfil" component={Perfil} 
			options={{
			tabBarLabel: 'Perfil',
			tabBarIcon: ({ color }) => (
				<MaterialCommunityIcons name="account" color={color} size={26} />
			),
			}}
			/>
			
		</Tab.Navigator>
	)
}