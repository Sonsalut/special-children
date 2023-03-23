import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface TestProps{
  name?: string
}

const Test = ({
    name
}:TestProps) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
   
  )
}

export default Test

const styles = StyleSheet.create({})