import React from 'react';
import { TextInput, DefaultTheme } from 'react-native-paper'; // Import DefaultTheme
import { View, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon


function ConstInput({ name, label, onChange, placeholder, value }) {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white', 
      placeholder: 'white', 
    },
  };

  return (
    <View style={{ width: '100%' }}>
        <Text style={{marginBottom: 10, color: "white", fontSize: 15}}>Username</Text>
        <Icon style={{fontSize: 20, color: "white", marginLeft: 10, marginTop: 49, position:"absolute"}} name={name}></Icon>

        <TextInput
            style={styles.input}
            theme={customTheme}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="white"
            textColor='white'
            value={value}
            mode='flat'>
            </TextInput>
    </View>
  );
}

export default ConstInput;
styles = StyleSheet.create({
    input:{
        backgroundColor: 'transparent', 
        borderColor:"white", 
        color: 'white', 
        borderColor: "white", 
        marginBottom: 20, 
        borderColor:"white", 
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 20,
        paddingLeft: 20
    }
})