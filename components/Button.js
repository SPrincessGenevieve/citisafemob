import React from 'react';
import { TouchableOpacity, Text} from 'react-native';

function Button({title, onPress, id}) {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={onPress} id={id}>
                <Text style={{color:"white", fontSize: 15}}>{title}</Text>
            </TouchableOpacity>
        </>
        
    );
}

export default Button;