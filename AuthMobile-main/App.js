
import React, { useContext } from 'react'
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/theme';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  UserProfileScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  UserScreen
} from './src/screens/'
import MainMap from './src/map/components/MainMap/MainMap';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="UserProfileScreen" options={{headerShown: false}} component={UserProfileScreen} />
          <Stack.Screen name="EditProfileScreen" options={{headerShown: false}} component={EditProfileScreen} />
          <Stack.Screen name="ChangePasswordScreen" options={{headerShown: false}} component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
