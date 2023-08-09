import React from 'react';
import { Toucha } from 'react-native';
import { Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';

function ConstInput({placeholder, text, marginTop, autoCapitalize, value}) {

    const [fontsLoaded] = useFonts({
        'Roboto-Light': require('./../../assets/fonts/Roboto-Light.ttf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return (
        <>
                <Text style={{fontSize: 10, color: "white", fontFamily:"Roboto-Light", marginLeft: 7, marginTop:marginTop}}>{text}</Text>
                <TextInput value={value} placeholder={placeholder} placeholderTextColor="white" autoCapitalize={autoCapitalize}
                style=
                    {{
                        color:"white", 
                        borderBottomWidth: 0.9, 
                        borderRadius: 10, 
                        padding: 10, 
                        borderColor:"white", 
                        fontSize: 17, 
                        width: "100%",
                    }}
                    ></TextInput>
            </>
        
    );
}

export default ConstInput;