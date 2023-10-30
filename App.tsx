import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen, ResetPasswordScreen, SignUpScreen } from './src/screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { ObjectModelScreen } from './src/screens-curso/ObjectModelScreen';

export const App = () => {
  return (
    <NavigationContainer>
      <LoginScreen/>
      {/* <SignUpScreen /> */}
      {/* <ResetPasswordScreen /> */}
      {/* <ObjectModelScreen /> */}
    </NavigationContainer>
  )
}
