import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { LoginScreen, ResetPasswordScreen, SignUpScreen } from '../screens';
import Readings from '../screens/Readings';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='LoginScreen'
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
        title: 'a',
        headerShown: false,
      }}
      >
      <Stack.Screen name="LoginScreen" component={LoginScreen}  />
      <Stack.Screen name="SignUpScreen" options={{ title:"Sign Up" }} component={SignUpScreen} />
      <Stack.Screen name="ResetPasswordScreen" options={{ title:"Reset Password" }} component={ResetPasswordScreen} />
      <Stack.Screen name="Readings" options={{ title:"Readings" }} component={Readings} />
    </Stack.Navigator>
  );
};

