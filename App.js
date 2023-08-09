import { StyleSheet, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppNavigator from './AppNavigator';


const Stack = createNativeStackNavigator();
const { height } = Dimensions.get('window');

export default function App() {

  return <AppNavigator></AppNavigator>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    height,
  },
});
