import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import KeyboardWithoutWrapper from '../components/KeyboardWithoutWrapper';
import ConstInput from '../components/ConstInput';
import ConstInputShort from '../components/ConstInputShort';
import ConstButtonShort from '../components/ConstButtonShort';
import Confirm from './ConfirmScreen';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import * as Location from 'expo-location';
import axios from 'axios';
import { useRoute } from "@react-navigation/native";

const GEOAPIFY_API_KEY = '086bbfa502194f61b72f18fb6ebaad5b';


function FormScreen({navigation}) {

    const ocrText = useSelector((state) => state.infoText.extractedInfo);
    const ocrTextOCR = useSelector((state) => state.infoTextOCR.extractedInfo);
    const handleViolation = () => {
        navigation.navigate("ViolationScreen");
    }

    const handleHome = () =>{
        navigation.navigate("HomeScreen")
    }

    const [isVisible, setIsVisible] = useState(false)
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [currentTime, setCurrentTime] = useState(moment().format('hh:mm A'));
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const handleCam = () => {
        navigation.navigate("CameraProof");
        navigation.setOptions({
            setImageUri: setImageUri
        });
    };
    const route = useRoute();
    const receivedImageUri = route.params?.imageUri;
    console.log("receivedImageUri:", receivedImageUri);

    const [imageUriState, setImageUriState] = useState(receivedImageUri);

    const clearImage = () => {
        setImageUriState(null);
    };

    const fetchTime = () => {
        const currentTimeFormatted = moment().format('hh:mm A');
        setCurrentTime(currentTimeFormatted);
    };

    const fetchLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);

            const requestOptions = {
                method: 'GET',
            };

            const geoapifyResponse = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apiKey=${GEOAPIFY_API_KEY}`, requestOptions);
            const geoapifyData = await geoapifyResponse.json();

            console.log('Geoapify Response:', geoapifyData);

            const results = geoapifyData.features;
            console.log('Geoapify Results:', results); // Add this log

            if (results.length > 0) {
                const formattedDetailedAddress = results[0].properties.formatted;

                setAddress(formattedDetailedAddress);
                setDetailedAddress(formattedDetailedAddress);
                console.log('Address:', formattedDetailedAddress); // Add this log
            } else {
                setAddress('Unknown Address');
                setDetailedAddress('Unknown Address');
            }
        } catch (error) {
            console.log('Error getting location:', error);
        }
    };

    const createDetailedAddress = (addressComponents) => {
        let detailedAddress = '';
        const zoneIndex = addressComponents.findIndex(component => component.types.includes('sublocality_level_1'));
        if (zoneIndex !== -1) {
            detailedAddress += `ZONE ${addressComponents[zoneIndex].long_name} `;
        }

       
        const relevantComponents = ['route', 'locality', 'administrative_area_level_2', 'administrative_area_level_1', 'country'];
        for (const component of addressComponents) {
            if (relevantComponents.some(type => component.types.includes(type))) {
                detailedAddress += `${component.long_name}, `;
            }
        }

        return detailedAddress.slice(0, -2);
    };



    useEffect(() => {
        const fetchTime = () => {
            const currentTimeFormatted = moment().format('hh:mm A');
            setCurrentTime(currentTimeFormatted);
        };
        
        const fetchDate = () => {
            const currentDateFormatted = moment().format('YYYY-MM-DD');
            setCurrentDate(currentDateFormatted);
        };
    
        fetchTime();
        fetchDate();
        fetchLocation();
    }, []);

    useEffect(() => {
        setImageUriState(receivedImageUri);
    }, [receivedImageUri]);

    return (
        <View style={{flex: 1}}>
        <KeyboardWithoutWrapper>
            <View style={styles.contanier}>
                <View style={{ padding: 30, paddingTop: 50 }}>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort marginRight={55} width={165} value={"2343"} text="MFRTA TCT No"></ConstInputShort> 
                        <ConstInputShort width={165} value={currentDate} text="Date"></ConstInputShort>
                    </View>
                        <ConstInput value={ocrText.name}  autoCapitalize="characters" text="Last Name, First Name, Middle Name"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort value={ocrText.nationality} text="Nationality"></ConstInputShort>
                        <ConstInputShort value={ocrText.sex} text="Sex"></ConstInputShort>
                        <ConstInputShort value={ocrText.type} text="Type"></ConstInputShort>
                    </View>
                    <View style={{flexDirection:"row", marginBottom: 30}}>
                        <ConstInputShort value={ocrText.weight} text="Weight"></ConstInputShort>
                        <ConstInputShort value={ocrText.height} text="Height"></ConstInputShort>
                        <ConstInputShort value={ocrText.dateOfBirth} text="Date of Birth"></ConstInputShort>
                    </View>
                        <ConstInput value={ocrText.address} text="Address"></ConstInput>
                        <ConstInput marginTop={30} value={ocrText.licenseNumber} text="Driver License Number"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30}}>
                        <ConstInputShort value={ocrTextOCR.plate_no} text="Vehicle Plate No."></ConstInputShort>
                        <ConstInputShort value={ocrTextOCR.make} text="Make"></ConstInputShort>
                        <ConstInputShort value={ocrTextOCR.series} text="Model"></ConstInputShort>
                    </View>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort value="" text="Color"></ConstInputShort>
                        <ConstInputShort value="" text="Class"></ConstInputShort>
                        <ConstInputShort value="" text="Body Markings"></ConstInputShort>
                    </View>
                        <ConstInput value={ocrTextOCR.complete_owners_name} text="Registered Owner"></ConstInput>
                        <ConstInput value={ocrTextOCR.complete_address} marginTop="10%" text="Address"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort marginRight={55} width={165} value={ocrTextOCR.telephone_no_contact_details} text="Contact No."></ConstInputShort>
                        <ConstInputShort width={165} value={currentTime} text="Time of Violation"></ConstInputShort>
                    </View>
                    <ConstInput value={detailedAddress} text="Place of Violation"></ConstInput>
                    <ConstInput marginTop={30} marginBottom={30} value="ANNA NICOLE GABRIENTO" text="Apprehending Officer"></ConstInput>

                    
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 20, color: "white", marginBottom: 30 }}>Image Evidence:</Text>
                        {receivedImageUri ? (
                            <>
                                <Image style={{ height: 350, width: 350, borderRadius: 30 }} source={{ uri: receivedImageUri }} />
                                <TouchableOpacity
                                    style={{ position: "absolute", right: 50, top: 10 }}
                                    onPress={() => {
                                        setImageUriState(null);
                                        navigation.setParams({ imageUri: null });
                                    }}
                                >
                                    <Icon style={{ fontSize: 30, color: "white" }} name='closecircleo'></Icon>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={{ color: "white" }}>No Image Available</Text>
                            </>
                        )}
                        <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }} onPress={handleCam}>
                            <Icon style={{ fontSize: 30, color: "white" }} name='camerao'></Icon>
                        </TouchableOpacity>
                    </View>
                </View>   
            </View>
        </KeyboardWithoutWrapper>

            <View style={{backgroundColor:"#3C66D2", width:"100%", height: 87, flexDirection: "row", alignItems:"center", justifyContent:"center"}}>
                <ConstButtonShort onPress={() => setIsVisible(!isVisible)}  name="close" title="Cancel" backgroundColor="#C8B23D"></ConstButtonShort>
                <ConstButtonShort onPress={handleViolation}  name="check" title="Next" backgroundColor="#5F5DC5"></ConstButtonShort>
            </View>
            {
                isVisible ? (
                    <>
                        <Confirm YesBtn={handleHome} NoBtn={() => setIsVisible(!isVisible)}></Confirm>
                    </>
                ) : null
            }
        </View>
    );
}

export default FormScreen;

const styles = StyleSheet.create({
    contanier: {
        backgroundColor:"#3C66D2",
        flex: 1,
        height: "100vh",

    }
})