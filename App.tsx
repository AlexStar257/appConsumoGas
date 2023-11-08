import 'react-native-gesture-handler';
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen, ResetPasswordScreen, SignUpScreen } from './src/screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  )
}