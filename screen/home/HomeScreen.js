import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from '../scan/ScanScreen';
import RecordScreen from '../record/RecordScreen';
import Background from '../../components/Background';
import { IconButton } from 'react-native-paper';
import Button from '../../components/Button';
import { loadCustomFonts } from '../../components/CustomFonts';

loadCustomFonts();


function HomeScreen({ onPress }) {
  const [visible, isVisible] = useState(true);
  const [scan, isScan] = useState(false);
  const [record, isRecord] = useState(false);




    return (
        <View style={styles.container}>
            
            <Background></Background>
            {visible ? (
                <View style={styles.homeContainer}>
                    <Text style={styles.title}>CITISAFE</Text>
                    <View style={{marginBottom: 50}}>
                        <Text style={styles.greeting}>Good day</Text>
                        <Text style={styles.name}>Mr. John Wick Batumbakal</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Button title="Scan Driver's License and OR/CR" onPress={() => isScan(!scan) & isVisible(!visible)} ></Button>
                        <Button title="Check Records" onPress={() => isRecord(!record) & isVisible(!visible)} ></Button>                  
                    </View>
                    <Text>Apps by GEMS</Text>
                    <View style={{backgroundColor:"transparent", position:"absolute", width:"100%", marginTop: 20}}>
                        <IconButton style={{ backgroundColor: "transparent", position: "relative", alignSelf:"flex-start"}} iconColor='white' onPress={onPress} icon="arrow-left"></IconButton>
                    </View>
                </View>
                
            ) : null}

            {scan ? (
                <>
                    <ScanScreen></ScanScreen>
                </>
            ) : null}
            {record ? (
                <>
                    <RecordScreen></RecordScreen>
                </>
            ) : null}
            
            
            
        </View>
    );
}

export default HomeScreen;

styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center"
    },
    homeContainer:{
        position:"absolute",
        width:"90%",
    },
    title:{
        fontFamily: 'Zen Dots Regular',
        fontSize: 40,
        color:"white",
        marginTop: "50%",
        marginBottom: "30%",
        alignSelf:"center"
    },
    greeting:{
        fontFamily: 'Roboto-Light',
        fontSize: 25,
        color:"white"
    },
    name:{
        fontFamily: 'Roboto-Light',
        fontSize: 30,
        fontWeight:"bold",
        color:"white"
    },
    button:{
        backgroundColor:"#395CDB", 
        height: 60, 
        justifyContent:"center", 
        alignItems:"center", 
        width:"100%", 
        borderRadius: 10,
        marginBottom: 25,
    }
})