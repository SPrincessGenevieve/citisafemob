import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';

function TextButton({title, onPress}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text style={{color:"white", fontSize: 20}}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TextButton;