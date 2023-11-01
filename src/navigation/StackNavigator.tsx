import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { LoginScreen, ResetPasswordScreen, SignUpScreen } from '../screens';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName='Page1Screen'
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="LoginScreen" options={{ title:"Log in" }} component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" options={{ title:"Sign Up" }} component={SignUpScreen} />
      <Stack.Screen name="ResetPasswordScreen" options={{ title:"Reset Password" }} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
