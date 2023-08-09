import React, { useState } from 'react';
import {  View, Text, StyleSheet, TextInput } from 'react-native';
import ViolationCheck from '../components/ViolationCheck';
import KeyboardWithoutWrapper from '../components/KeyboardWithoutWrapper';
import violationData from '../components/ViolationList.json'




function Violations(props) {

    const [searchQuery, setSearchQuery] = useState('');
  
    const filteredData = violationData.filter(item =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <KeyboardWithoutWrapper>
          <View style={styles.container}>
            <TextInput
              placeholder='Search violation'
              placeholderTextColor="white"
              style={{ borderBottomWidth: 1, color: "white", borderColor: "white", marginBottom: 40, marginTop: 30 }}
              onChangeText={text => setSearchQuery(text)}
            />
            <View style={{ }}>
              {filteredData.map(item => (
                <ViolationCheck
                  key={item.id}
                  id={item.id}
                  text={item.text}
                />
              ))}
            </View>
          </View>
        </KeyboardWithoutWrapper>
      );
    }
export default Violations;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3C66D2',
        flex: 1,
        height: 1400,
        padding: 30,
        paddingTop: 40
    },
});
