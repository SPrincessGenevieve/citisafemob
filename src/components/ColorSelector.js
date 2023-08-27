import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Button } from 'react-native';
import KeyboardWithoutWrapper from './KeyboardWithoutWrapper';
import GradientBackground from './GradientBG';
import colorsData from './Colors.json'
import ConstInput from './ConstInput'
import ClassDisplay from './ClassDisplay';
import BodyMarkings from './BodyMarkings';
import ConstButton from './ConstButton';
import FormScreen from './../screens/FormScreen'

const predefinedColors  = [
  { hex: '#000000', name: 'Black' },
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#C0C0C0', name: 'Silver' },
  { hex: '#808080', name: 'Gray' },
  { hex: '#0000FF', name: 'Blue' },
  { hex: '#FF0000', name: 'Red' },
  { hex: '#008000', name: 'Green' },
  { hex: '#A52A2A', name: 'Brown' },
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#800080', name: 'Purple' },
  { hex: '#FFDF00', name: 'Gold' },
  { hex: '#CD7F32', name: 'Bronze' },
  { hex: '#F5F5DC', name: 'Beige' },
  { hex: '#FFC0CB', name: 'Pink' },
  { hex: '#008080', name: 'Teal' },
  { hex: '#800020', name: 'Burgundy' },
  { hex: '#800000', name: 'Maroon' },
  { hex: '#000080', name: 'Navy' },
  { hex: '#36454F', name: 'Charcoal' }
];


export default function ColorSelector({navigation}) {
    const [customColor, setCustomColor] = useState('');
    const [matchedColor, setMatchedColor] = useState(null);

    useEffect(() => {
        if (customColor) {
        const matchedPredefinedColor = predefinedColors.find(
            (color) =>
            color.name.toLowerCase() === customColor.toLowerCase()
        );

        if (matchedPredefinedColor) {
            setSelectedColor(matchedPredefinedColor.hex);
            setCustomColor('');
            setMatchedColor(null);
            return;
        }

        const matchedJsonColor = colorsData.find(
            (color) =>
            color.name.toLowerCase() === customColor.toLowerCase()
        );

        if (matchedJsonColor) {
            setSelectedColor(matchedJsonColor.hex);
            setCustomColor('');
            setMatchedColor(null);
            return;
        }

        setMatchedColor('Color not found');
        } else {
        setMatchedColor(null);
        }
    }, [customColor]);

    const handleCustomColorChange = (color) => {
        setCustomColor(color);
    };

    const getColorName = (colorHex) => {
        const selectedColorObject = predefinedColors.find((color) => color.hex === colorHex);
        return selectedColorObject ? selectedColorObject.name : '';
      };

      
    const handleForm = () => {
      navigation.navigate("FormScreen", {
          selectedColor: selectedColor,
          selectedClass: selectedClass,
          selectedMarkings: selectedMarkings,
      });
    };


   


      const renderColorButtons = () => {
        const rows = [];
        for (let i = 0; i < predefinedColors.length; i += 5) {
            const rowColors = predefinedColors.slice(i, i + 5);
            const row = (
                <View key={i} style={styles.colorRow}>
                    {rowColors.map((color) => (
                        <TouchableOpacity
                            key={color.hex}
                            style={[
                                styles.colorButton,
                                {
                                    backgroundColor: selectedColor === color.hex ? 'transparent' : color.hex,
                                    borderColor: selectedColor === color.hex ? 'white' : color.hex, // Border color changes on selection
                                    borderWidth: selectedColor === color.hex ? 2 : 0,
                                    opacity: selectedColor === color.hex ? 1 : 1,
                                },
                            ]}
                            onPress={() => handleColorSelection(color.hex)}
                            >
                            <Text style={[styles.colorText, { color: selectedColor === color.hex ? 'white' : 'lightgrey' }]}>
                                {color.name}
                            </Text>                        
                        </TouchableOpacity>
                    ))}
                </View>
            );
            rows.push(row);
        }
        return rows;
    };

  

    const handleCustomColorSubmit = () => {
        const matchedColor = predefinedColors.find(
          (color) =>
            color.name.toLowerCase() === customColor.toLowerCase() ||
            color.hex.toLowerCase() === customColor.toLowerCase()
        );
    
        if (matchedColor) {
          setSelectedColor(matchedColor.hex);
          setCustomColor('');
        } else {
          alert('Color not found. Please enter a valid color name or hex code.');
        }
      };

      const [selectedColor, setSelectedColor] = useState(null);
      const [selectedClass, setSelectedClass] = useState(null);
      const [selectedMarkings, setSelectedMarkings] = useState(null);

      const handleColorSelection = (color) => {
          setSelectedColor(color);
      };

      const handleClassSelection = (classCode) => {
          setSelectedClass(classCode);
      };

      const handleBodyMarkingsSelection = (markings) => {
          setSelectedMarkings(markings);
      };


              
    
      return (
        <KeyboardWithoutWrapper>
          <View style={styles.container}>
            <GradientBackground></GradientBackground>
            <View style={{paddingBottom: 30}}>
                
                <View style={styles.selectColor}>
                    <Text style={{textAlign:"center", fontSize: 20, color:"white", marginBottom: 20}}>Vehicle Color</Text>
                    <View style={{width: 400, marginBottom: 30}}>
                        <ConstInput onChangeText={handleCustomColorChange} value={customColor} placeholder="Enter color name"></ConstInput>
                    </View>
                    {matchedColor && <Text style={{color:"red", marginBottom: 20, fontSize: 20}}>{matchedColor}</Text>}
                    {renderColorButtons()}
                    <Text style={{color:"white", marginTop: 20}}>Selected Color</Text>
                    <View
                        style={[
                            styles.selectedColorIndicator,
                            { backgroundColor: selectedColor },
                        ]}
                    />
                    <Text style={{color:"white"}}>{selectedColor ? getColorName(selectedColor) : ''}</Text>
                </View>
            </View>
            <View style={{marginBottom: 10}}>
                <ClassDisplay onClassSelection={handleClassSelection}></ClassDisplay>
            </View>
            <View style={{marginBottom: 10}}>
                <BodyMarkings onBodySelection={handleBodyMarkingsSelection}></BodyMarkings>
            </View>
            <View style={{display:"flex", width:"90%"}}>
                <ConstButton onPress={handleForm} title={"NEXT"}></ConstButton>
            </View>


          </View>
        </KeyboardWithoutWrapper>
      );
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
      height: 1200
    },

    button:{
        backgroundColor:"white",
        borderRadius: 20,
        height: 50,
        width: 200,
        padding: 10,
        justifyContent:"center",
        alignItems:"center",
        marginTop: 20,
        marginBottom: 20
    },
    textButtom:{
        fontSize: 20
    },
    selectColor: {
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    colorRow: {
      flexDirection: 'row',
    },
    colorButton: {
      width: 50,
      height: 50,
      margin: 5,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorText: {
      fontSize: 10,
      textAlign: 'center'
    },
    selectedColorIndicator: {
        width: 50,
        height: 50,
        marginTop: 20,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 25,
    },
    customColorInput: {
      marginTop: 10,
      width: 200,
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    classOption: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20
  },
  });