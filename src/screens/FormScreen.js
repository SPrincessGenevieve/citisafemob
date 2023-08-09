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
                        <ConstInput autoCapitalize="characters" text="Last Name, First Name, Middle Name"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort text="Nationality"></ConstInputShort>
                        <ConstInputShort text="Sex"></ConstInputShort>
                        <ConstInputShort text="Date of Birth"></ConstInputShort>
                    </View>
                        <ConstInput text="Address"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30}}>
                        <ConstInputShort width="200%" text="Driver License Number"></ConstInputShort>
                        <ConstInputShort marginLeft="35%" text="Type"></ConstInputShort>
                    </View>
                    <View style={{flexDirection:"row", marginTop: 30}}>
                        <ConstInputShort text="Vehicle Plate No."></ConstInputShort>
                        <ConstInputShort text="Make"></ConstInputShort>
                        <ConstInputShort text="Model"></ConstInputShort>
                    </View>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort text="Color"></ConstInputShort>
                        <ConstInputShort text="Class"></ConstInputShort>
                        <ConstInputShort text="Body Markings"></ConstInputShort>
                    </View>
                        <ConstInput text="Registered Owner"></ConstInput>
                        <ConstInput marginTop="10%" text="Address"></ConstInput>
                    <View style={{flexDirection:"row", marginTop: 30, marginBottom: 30}}>
                        <ConstInputShort text="Contact No."></ConstInputShort>
                        <ConstInputShort text="Telephone No. "></ConstInputShort>
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