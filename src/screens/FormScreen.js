import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import KeyboardWithoutWrapper from '../components/KeyboardWithoutWrapper';
import ConstInput from '../components/ConstInput';
import ConstInputShort from '../components/ConstInputShort';
import ConstButtonShort from '../components/ConstButtonShort';
import Confirm from './ConfirmScreen';
import { useSelector } from "react-redux";

function FormScreen({navigation}) {

    const ocrText = useSelector((state) => state.infoText.extractedInfo);

    const handleViolation = () => {
        navigation.navigate("ViolationScreen");
    }

    const handleHome = () =>{
        navigation.navigate("HomeScreen")
    }

    const [isVisible, setIsVisible] = useState(false)

    return (
        <View style={{flex: 1}}>
        <KeyboardWithoutWrapper>
            <View style={styles.contanier}>
                <View style={{ padding: 30, paddingTop: 50 }}>
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
                        <ConstInputShort value="RAR-2323" text="Vehicle Plate No."></ConstInputShort>
                        <ConstInputShort value="TESLA" text="Make"></ConstInputShort>
                        <ConstInputShort value="Tesla Model 1" text="Model"></ConstInputShort>
                    </View>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort value="Tesla Model 1" text="Color"></ConstInputShort>
                        <ConstInputShort value="Truck" text="Class"></ConstInputShort>
                        <ConstInputShort value="None" text="Body Markings"></ConstInputShort>
                    </View>
                        <ConstInput value="JAYDE MIKE ENGRACIA" text="Registered Owner"></ConstInput>
                        <ConstInput value="Baranggay Unahan, Cagayan De Oro, Bukidnon" marginTop="10%" text="Address"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort marginRight={55} width={165} value="09123456789" text="Contact No."></ConstInputShort>
                        <ConstInputShort width={165} value="909-2342334" text="Telephone No. "></ConstInputShort>
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
        height: 950,

    }
})