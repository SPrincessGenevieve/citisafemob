import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

function ConstButton({title, onPress}) {
    return (
        <View style={{height: 100, width: "100%", alignContent:"center", justifyContent:"center"}}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={{textAlign:"center", fontSize: 20, color:"white"}}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
} 

export default ConstButton;

styles = StyleSheet.create({
    button:{
        backgroundColor:"#395CDB", 
        width: "100%", 
        height: "50%", 
        borderRadius: 10, 
        borderBottomLeftRadius: 10, 
        borderBottomLeftRadius: 10, 
        justifyContent:"center",
    }
})