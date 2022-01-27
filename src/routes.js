import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// import Home from './pages/Home';
import Users from './pages/Users';

import Rotas from './routes/routes';

export default function Routes() {
  return (
    <Stack.Navigator 
      initialRouteName="Users" 
      screenOptions={{ 
        headerTintColor: '#FFF' 
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Rotas} 
        options={{ title: 'Routes' }}
      />
      <Stack.Screen 
        name="Users" 
        component={Users}
      />
    </Stack.Navigator>
  );
}