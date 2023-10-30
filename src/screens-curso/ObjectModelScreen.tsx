import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const  ObjectModelScreen = () => {
  return (
    <View style={ styles.container } >
        <Text style={ styles.title } >Object Model Screen</Text>    
    </View>
  )
}

const styles = StyleSheet.create({

  container : {
    backgroundColor: 'red',
  },

  title: {
    fontSize: 20,
  }

})
