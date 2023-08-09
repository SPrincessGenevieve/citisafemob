import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import KeyboardWithoutWrapper from '../components/KeyboardWithoutWrapper';
import ConstInput from '../components/ConstInput';
import ConstInputShort from '../components/ConstInputShort';
import ConstButtonShort from '../components/ConstButtonShort';
import Confirm from './ConfirmScreen';

function FormScreen({navigation}) {

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
                        <ConstInput value="ENGRACIA, JAYDE MIKE"  autoCapitalize="characters" text="Last Name, First Name, Middle Name"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort value="Filipino" text="Nationality"></ConstInputShort>
                        <ConstInputShort value="M" text="Sex"></ConstInputShort>
                        <ConstInputShort value="03/23/2000" text="Date of Birth"></ConstInputShort>
                    </View>
                        <ConstInput value="Baranggay Unahan, Cagayan De Oro, Bukidnon" text="Address"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30}}>
                        <ConstInputShort value="ABC-12341313813-dadA" width="200%" text="Driver License Number"></ConstInputShort>
                        <ConstInputShort value="Non Prof." marginLeft="35%" text="Type"></ConstInputShort>
                    </View>
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
                        <ConstInputShort value="09123456789" text="Contact No."></ConstInputShort>
                        <ConstInputShort value="909-2342334" text="Telephone No. "></ConstInputShort>
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
        height: 900,

    }
})