import React from 'react';
import { Button, Text, View } from 'react-native';

function InfoScreen(props) {
    return (
        <View>
            <Text>INFORMATION</Text>
            <Button title='Cancel'></Button>
            <Button title='Submit'></Button>
            <Button title='Back'></Button>
        </View>
    );
}

export default InfoScreen;