import React, { useEffect, useState, useRef } from "react";
import { 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    Image,
    Text } from "react-native";
import { 
    Camera, 
    CameraType, 
    requestCameraPermissionsAsync, 
    getCameraPermissionsAsync, // Fixed typo here
} from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { setRecognizedText } from "./camera/infoSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";


export default function CameraScan() {
    const [cameraMode, setCameraMode] = useState(CameraType.back);
    const [flash, setFlash] = useState("off"); // Changed to string type
    const [pictureUri, setPictureUri] = useState("");
    const cameraRef = useRef();
    const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr

    const dispatch = useDispatch();
    const navigation = useNavigation();

    // saving data
    const [data, setData] = useState({
      type: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      nationality: "",
      sex: "",
      date_of_birth: "",
      weight: "",
      height: "",
      address: "",
      license_no: "",
      expiration_date: "",
      dl_codes: "",
      conditions: "",
      agency_code: "",
      restrictions: "",
    })



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
      const cropWidth = 2000;
      const cropHeight = 1420;
      const left = 200;
      const top = 1330;

      try {
        // Crop the image with specified dimensions
        const croppedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ crop: { originX: left, originY: top, width: cropWidth, height: cropHeight } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG } // Adjust the compression quality here (0.8 means 80% quality)
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
          // Make sure there's a picture to process
          if (!pictureUri) {
            Alert.alert("Please take a picture first.");
            return;
          }
      
          // Call the Mindee OCR API to extract text from the image
          const apiKey = '5f9a18dcb66e4eca17af461b4b619bc9'; // Replace this with your Mindee OCR API key
          const apiUrl = "https://api.mindee.net/v1/products/SPrincessGenevieve/gems/v1/predict";
      
          const formData = new FormData();
          formData.append('document', { uri: pictureUri, name: 'image.jpg', type: 'image/jpeg' });
      
          const response = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${apiKey}`, // Use the correct authorization format
            },
          });

          if (response?.data?.document !== undefined) {
            const extractedData = response.data.document.inference.pages[0].prediction;

            // Concatenate values for fields with multiple values
            const concatenatedFields = {
                type: "",
                address: "",
                agency_code: "",
                blood_type: "",
                conditions: "",
                date_of_birth: "",
                dl_codes: "",
                expiration_date: "",
                last_name_first_name_middle_name: "",
                height: "",
                license_no: "",
                nationality: "",
                sex: "",
                weight: "",
                restrictions: "",
                // Add other fields here
            };

            for (const fieldName in concatenatedFields) {
                if (extractedData[fieldName]?.values) {
                    let concatenatedValue = "";
                    for (const value of extractedData[fieldName]?.values || []) {
                        concatenatedValue += value.content + " ";
                    }
                    concatenatedFields[fieldName] = concatenatedValue.trim();
                }
            }

            // Update the data state with concatenated values
            setData({
                ...data,
                ...concatenatedFields,
                // Add other fields similarly
            });

            dispatch(setRecognizedText({
              type : concatenatedFields.type,
              name: concatenatedFields.last_name_first_name_middle_name,
              licenseNumber: concatenatedFields.license_no,
              dateOfBirth: concatenatedFields.date_of_birth,
              bloodType: concatenatedFields.blood_type,
              nationality: concatenatedFields.nationality,
              sex: concatenatedFields.sex,
              weight: concatenatedFields.weight,
              height: concatenatedFields.height,
              address: concatenatedFields.address,
              dl_codes: concatenatedFields.dl_codes,
              expirationDate: concatenatedFields.expiration_date,  
              agency_code: concatenatedFields.agency_code,
              conditions: concatenatedFields.conditions,   
              restrictions: concatenatedFields.restrictions,
            }))

        } else {
            Alert.alert("Text extraction failed. Please try again later.");
        }
    } catch (error) {
        console.log("Error extracting text:", error);
        Alert.alert("Error extracting text. Please try again later.");
    }


        navigation.navigate('FormScreen');
  };

  useEffect(() => {
    console.log("Updated Data:", data);
}, [data]);      

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
        quality: 1,
      })

      console.log(result);
      if (!result.canceled) {
        setPictureUri(result.assets[0].uri);
        setShowPicture(true)
      }

    }



  return(
        <View style={styles.container}>
        {/* Show the camera preview or the captured picture */}
        {showPicture ? (
          <View style={styles.pictureContainer}>
            <Image style={styles.picture} source={{ uri: pictureUri }} />
            
            
            <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={cancelPicture}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
          <Camera ref={cameraRef} style={styles.camera} type={cameraMode} flashMode={flash} >
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
        <View style={styles.cardoutline}>
          <Text style={styles.cardText}>Place the Driver's License Card Here</Text>
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
      aspectRatio: 3/4
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
    cardoutline: {
      width: 346,
      height: 245,
      borderWidth: 3,
      borderRadius: 19,
      borderColor: "white",
      position: "absolute",
      zIndex: 1,
      top: "45%",
      left: "50%",
      marginLeft: -173,
      marginTop: -123,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
      bottom: 50,
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
      bottom: 50,
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