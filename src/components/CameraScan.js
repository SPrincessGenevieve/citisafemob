import React, { useEffect, useState, useRef } from "react";
import {     View, TouchableOpacity, StyleSheet, Alert, Image, Text, ScrollView} from "react-native";
import { Camera, CameraType, requestCameraPermissionsAsync, getCameraPermissionsAsync} from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import ConstButtonShort from "./ConstButtonShort";


export default function ScanScreen({title, style}) {
    const [cameraMode, setCameraMode] = useState(CameraType.back);
    const [flash, setFlash] = useState("off"); // Changed to string type
    const [pictureUri, setPictureUri] = useState("");
    const cameraRef = useRef();
    const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picture
    const [result, setResult] = useState(false); // New state variable to control showing the picture
    const navigation = useNavigation();
    const [extractedText, setExtractedText] = useState("");



    useEffect(() => {
        requestPermission();
    }, []);    

    const requestPermission = async () => {
        await requestCameraPermissionsAsync();
    };    

    const getPermission = async () => {
        const cameraPermission = await getCameraPermissionsAsync();
        return cameraPermission.granted;
    };

    const takePicture = async () => {
      const { uri, width, height } = await cameraRef?.current.takePictureAsync();
    
      // Calculate the dimensions for cropping (adjust these values according to your needs)
      const cropWidth = 2500;
      const cropHeight = 1450;
      const left = 270;
      const top = 1300;

      try {
        // Crop the image with specified dimensions
        const croppedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ crop: { originX: left, originY: top, width: cropWidth, height: cropHeight } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Adjust the compression quality here (0.8 means 80% quality)
        );

        // Set the cropped image URI
        setPictureUri(croppedImage.uri);
        setShowPicture(true);
      } catch (error) {
        console.log("Error cropping the image:", error);
        // Handle the error here
      }
    
    };    


    const cancelPicture = () => {
        // Remove the displayed picture and go back to the camera preview
        setPictureUri("");
        setShowPicture(false);
      };    

      const handleNextButton = async () => {
        try {
          if (!pictureUri) {
            Alert.alert("Please take a picture first.");
            return;
          }
    
          const apiUrl = "https://api.mindee.net/v1/products/SPrincessGenevieve/gems/v1/predict";
          const apiKey = "Token 5f9a18dcb66e4eca17af461b4b619bc9";
    
          const formData = new FormData();
          formData.append("document", {
            uri: pictureUri,
            name: "image.jpg",
            type: "image/jpeg",
          });
    
          const response = await axios.post(apiUrl, formData, {
            headers: {
              Authorization: apiKey,
              "Content-Type": "multipart/form-data",
            },
          });
    
          console.log("Mindee API Response:", response.data);
    
          if (response?.data?.document?.inference?.prediction) {
            const extractedFields = response.data.document.inference.prediction;
    
            const displayOrder = [
              "type",
              "last_name_first_name_middle_name",
              "nationality",
              "sex",
              "date_of_birth",
              "weight",
              "height",
              "address",
              "license_no",
              "expiration_date",
              "agency_code",
              "blood_type",
              "eyes_color",
              "dl_codes",
              "conditions",
              "restrictions",
            ];
    
            const extractedTexts = displayOrder
          .map((key) => {
            const values = extractedFields[key].values;
            const contentArray = values.map((item) => item.content);
            const content = contentArray.join("\n");
            return `"${key}":\n${content}`;
          })
          .join("\n\n");

        setExtractedText(extractedTexts);
        console.log("Extracted Texts:", extractedFields);
      } else {
        Alert.alert("Text extraction failed. Please try again later.");
      }
    } catch (error) {
      console.log("Error extracting text:", error);
      Alert.alert("Error extracting text. Please try again later.");
    }
    setResult(!result);
  };
      
      
      
      

    if (!getPermission()) {
        return Alert.alert(
            "Permission Required!",
            "You need to provide the permissions to access the camera",
            [{ text: "Got it" }]
        );
    }

    const switchFlashMode = () => {
        setFlash(flash === "off" ? "on" : "off");
    };

    const pickImage = async () => {

      let result =  await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      })

      console.log(result);
      if (!result.canceled) {
        setPictureUri(result.assets[0].uri);
        setShowPicture(true)
      }

    }

   



    return (
      <View style={styles.container}>
        {/* Show the camera preview or the captured picture */}
        {showPicture ? (
          <View style={styles.pictureContainer}>
            <Image style={styles.picture} source={{ uri: pictureUri }} />
            <View style={{ backgroundColor: "red", position: "absolute", width: "100%", height: "100%" }}>
              {result ? (
                <ScrollView>
                  <View>
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Scan Result</Text>
                    <Text style={{ color: "white", fontSize: 16, textAlign: "left", margin: 10 }}>
                      {extractedText || "No data extracted."}
                    </Text>
                  </View>
                </ScrollView>
              ) : null}
              
            </View>
            <View style={{ height: 250, width: 300, position: "absolute", marginTop: 550, top: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
              <ConstButtonShort onPress={cancelPicture} name="close" title="Cancel" backgroundColor="#C8B23D" />
              <ConstButtonShort onPress={handleNextButton} name="check" title="Next" backgroundColor="#5F5DC5" />
            </View>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
          <Camera ref={cameraRef} style={styles.camera} type={cameraMode} flashMode={flash}>
            {/* Empty View for the Camera component */}
          </Camera>   
          <View style={styles.controlsContainer}>
            <Feather name="image" size={35} color="white" onPress={pickImage} />
            <TouchableOpacity style={styles.takePictureBtn} onPress={takePicture} />
            <Feather
              name={flash === "off" ? "zap-off" : "zap"}
              size={30}
              onPress={switchFlashMode}
              color="white"
            />
          </View>
        </View>
        )}
  
  {!showPicture && (
        <View style={style}>
          <Text style={styles.cardText}>{title}</Text>
        </View>
      )}
    </View>
  )




}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    cameraContainer: {
      flex: 1,
      position: "relative",
    },
    camera: {
      flex: 1,
    },
    controlsContainer: {
      backgroundColor: "rgba(57, 92, 219, 1)",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    takePictureBtn: {
      backgroundColor: "#fff",
      borderRadius: 35,
      height: 70,
      width: 70,
      marginVertical: 10,
    },
    cardText: {
      color: "white",
      letterSpacing: 1.5,
      textAlign: "justify",
    },
    pictureContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    picture: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    cancelBtn: {
      position: "absolute",
      bottom: 100,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      right: 95,
    },
    cancelText: {
      color: "red",
      fontSize: 16,
    },
    nextBtn: {
      position: "absolute",
      bottom: 100,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 20,
      left: 95
    },
    nextText: {
      color: "green",
      fontSize: 16,
    },
  });



