import React from 'react';
import { StyleSheet, Text, View, StatusBar, AppRegistry } from 'react-native';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import Instituicao from './src/screens/Instituicao';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigator.js';
import Routes from './src/routes.js';


// import { AppRegistry } from 'react-native'
// import { name as appName } from './app.json'
import { Provider } from 'react-redux'

import storeConfig from './src/store/storeConfig'
const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
      <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Navigator/>
      </NavigationContainer>  
    </Provider>
)

export default Redux
// AppRegistry.registerComponent(appName, () => Redux)

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar barStyle="light-content" />
//         <Navigator/> 
//     </NavigationContainer>
//   );
// }












// import React from 'react';
// import Routes from './src/routes';
// import { StatusBar } from 'react-native';
// import { NavigationNativeContainer } from '@react-navigation/native';

// export default function App() {
//   return (
//     <NavigationNativeContainer>
//       <StatusBar barStyle="light-content" />
//       <Routes />
//     </NavigationNativeContainer>
//   );
// }