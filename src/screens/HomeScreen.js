import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GradientBackground from '../components/GradientBGR';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '../components/BackButton';
import ConstButton from '../components/ConstButton';
import Title from '../components/Title';
import { useFonts } from 'expo-font';

function HomeScreen({navigation}) {
    const [fontsLoaded] = useFonts({
        'Roboto Light': require('./../../assets/fonts/Roboto-Light.ttf'),
        'Montserrat Bold': require('./../../assets/fonts/Montserrat-Bold.ttf'),
      });

      if (!fontsLoaded) {
        return null;
      }

      const handleRecord = () =>{
        navigation.navigate("Records");
      }

      const handleOCRSreen = () =>{
        navigation.navigate("OCRScan");
      }

      const handleForm = () =>{
        navigation.navigate("FormScreen");
      }

  


    return (
        <View style={{position:"absolute", height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
            <GradientBackground></GradientBackground>
            <View style={{top: 1, position:"absolute", marginTop: "30%", width:"80%"}}>
                <Title></Title>
                <Text style={{marginTop: "20%", color:"white", fontSize:20, fontFamily:"Roboto Light"}}>Good day</Text>
                <Text style={{marginTop: 20, color:"white", fontSize:20, fontFamily:"Montserrat Bold"}}>Mr. John Wick Batumbakal</Text>
            </View>



            <View style={{alignItems:"center", justifyContent:"center", width:"80%", marginTop: "30%"}}>
            <ConstButton onPress={handleRecord} name="book" title="Check Records"></ConstButton>
            <ConstButton onPress={handleOCRSreen} name="scan1" title="Scan Driver's License and OR/CR"></ConstButton>
            </View>
            
        </View>
    );
}

export default HomeScreen;