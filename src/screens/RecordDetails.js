import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import KeyboardWithoutWrapper from '../components/KeyboardWithoutWrapper';
import GradientBackground from '../components/GradientBGR';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAdd from 'react-native-vector-icons/MaterialIcons';

function RecordDetails({navigation}) {

    const handleForm = () => {
        navigation.navigate("FormScreen");
    }

    return (
        <View style={{height: 900}}>
          <GradientBackground></GradientBackground>
          <View style={{padding: 20}}>
            <View style={{backgroundColor:"white", height: "100%", borderRadius: 40, padding: 20}}>
                <View style={{padding: 10, marginTop: 20, borderBottomWidth: 3, borderBottomColor:"#DCDCDC"}}>
                    <Text style={{fontSize: 15, color:"#BABABA"}}>Driver's Name</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>Anna Nicole Gabriento</Text>
                    <Text style={{fontSize: 15, marginTop: 15, color:"#BABABA"}}>Driver's License Number</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>GA23-294329345-SADF</Text>
                </View>
                <View style={{position:"absolute", marginTop: 52, right: 0, marginRight: 30}}>
                    <Image style={{height: 95, width: 95}} source={require('./../../assets/images/profile.jpg')}></Image>
                </View>
                <KeyboardWithoutWrapper >
                    <>
                    <View style={{flexDirection:"column", flex: 1}}>
                        {/*<TouchableOpacity onPress={handleForm} style={{flexDirection:"column", marginTop: 20, justifyContent:"center", alignItems:"center", backgroundColor:"#2E54B3", flex: 1, borderRadius: 15, height: 50}}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <IconAdd name='post-add' style={{color:"white", fontSize: 30, zIndex: 999}}></IconAdd>
                                <Text style={{fontSize: 20, color:"white"}}>Add violation</Text>
                            </View>
                        </TouchableOpacity>*/}
                        <View style={{marginTop: 15}}>
                            <Text style={{fontSize: 15, textAlign:"center", fontWeight:"bold", height: 30, paddingTop: 5}}>Violations</Text>
                        </View>
                        <View style={{borderBottomWidth: 1, borderBottomColor: "#BBBBBB", marginTop: 20}}>
                            <View style={{flexDirection:"row", marginTop: 10}}>
                                <Text style={{fontWeight:"bold"}}>Driving without wearing a helmet</Text>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10}}>
                                <Text style={{marginRight: 10, fontWeight: "bold"}}>Date:</Text>
                                <Text style={{fontWeight: "bold"}}>02/02/2023</Text>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10}}>
                                <Text style={{marginRight: 10, fontWeight: "bold"}}>Offense:</Text>
                                <Text style={{fontWeight: "bold", color:"#998B11"}}>First Offense</Text>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10}}>
                                <Text style={{marginRight: 10, fontWeight: "bold"}}>Payment Status:</Text>
                                <Text style={{fontWeight: "bold", color:"#932323"}}>Overdue, 03/03/2023 4:00 PM</Text>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10}}>
                                <Text style={{marginRight: 10, fontWeight: "bold"}}>Apprehending Officer:</Text>
                                <Text style={{fontWeight: "bold"}}>Alduin Magallones</Text>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10, marginBottom: 20}}>
                                <Text style={{marginRight: 10, fontWeight: "bold"}}>Images:</Text>
                                <TouchableOpacity>
                                    <Text style={{color:"#2521FF"}}>View Image of Violation</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:"row", marginTop: 10, marginBottom: 20, justifyContent:"flex-end"}}>
                                <TouchableOpacity>
                                    <Icon name='printer' style={{fontSize: 30, textAlign:"right"}}></Icon>
                               </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </>
                </KeyboardWithoutWrapper>
            </View>

          </View>
        </View>
    );
}

export default RecordDetails;