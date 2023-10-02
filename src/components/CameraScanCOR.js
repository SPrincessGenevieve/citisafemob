import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Text,
} from "react-native";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync, // Fixed typo here
} from "expo-camera";
import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { setRecognizedText } from "./camera/infoSliceCOR";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import corners from "./../../assets/cornersOCR.png";

export default function CameraScanCOR() {
  const [cameraMode, setCameraMode] = useState(CameraType.back);
  const [flash, setFlash] = useState("off"); // Changed to string type
  const [capturedImage, setCapturedImage] = useState("");
  const [pictureUri, setPictureUri] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr
  const [cropMode, setCropMode] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [data, setData] = useState({
    plate_no: "",
    make: "",
    date: "",
    series: "",
    make: "",
    complete_owners_name: "",
    complete_address: "",
    telephone_no_contact_details: "",
  });

  useEffect(() => {
    requestPermission();
  }, []);

  const toggleFlash = () => {
    setFlash((currentFlash) =>
      currentFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const requestPermission = async () => {
    await requestCameraPermissionsAsync();
  };

  const getPermission = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    return cameraPermission.granted;
  };

  const takePicture = async () => {
    try {
      const { uri } = await cameraRef?.current.takePictureAsync();

      setCapturedImage(uri);
      setShowPicture(true);
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  const cancelPicture = () => {
    setCapturedImage("");
    setShowPicture(false);
  };

  const handleNextButton = async () => {
    try {
      if (!capturedImage) {
        Alert.alert("Please take a picture first.");
        return;
      }

      const apiKey = "8e467a5f1e58b9b383da543d49105ce5";
      const apiUrl =
        "https://api.mindee.net/v1/products/SPrincessGenevieve/cor/v1/predict";

      const formData = new FormData();
      formData.append("document", {
        uri: capturedImage,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${apiKey}`,
        },
      });

      if (response?.data?.document !== undefined) {
        const extractedData =
          response.data.document.inference.pages[0].prediction;

        const concatenatedFields = {
          plate_no: "",
          make: "",
          date: "",
          series: "",
          make: "",
          complete_owners_name: "",
          complete_address: "",
          telephone_no_contact_details: "",
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

        setData({
          ...data,
          ...concatenatedFields,
        });

        dispatch(
          setRecognizedText({
            plate_no: concatenatedFields.plate_no,
            make: concatenatedFields.make,
            date: concatenatedFields.date,
            series: concatenatedFields.series,
            make: concatenatedFields.make,
            complete_owners_name: concatenatedFields.complete_owners_name,
            complete_address: concatenatedFields.complete_address,
            telephone_no_contact_details:
              concatenatedFields.telephone_no_contact_details,
          })
        );
      } else {
        Alert.alert("Text extraction failed. Please try again later.");
      }
    } catch (error) {
      console.log("Error extracting text:", error);
      Alert.alert("Error extracting text. Please try again later.");
    }
    navigation.navigate("FormScreen");
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false, // Set to false to disable cropping
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      const { uri } = result;
      setCapturedImage(uri); // Use result.uri directly
      setCropMode(false);
      setShowPicture(true);
    }
  };

  return (
    <View style={styles.container}>
      {showPicture ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            zIndex: 4,
            width: "100%",
            height: "100%",
          }}
        >
          {capturedImage ? (
            <Image style={styles.picture} source={{ uri: capturedImage }} />
          ) : null}

          <View
            style={{
              height: "100%",
              width: "100%",
              zIndex: 9,
              position: "absolute",
              paddingHorizontal: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "70%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 15,
                borderWidth: 1,
              }}
              onPress={handleNextButton}
            >
              <Text style={{ color: "green", fontSize: 17 }}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
              }}
              onPress={cancelPicture}
            >
              <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {cropMode ? (
        <View>
          <ExpoImageManipulator
            photo={{ uri: capturedImage }}
            isVisible
            onPictureChoosed={(uri) => setCapturedImage(uri)}
            onToggleModal={() => setCropMode(!cropMode)}
          />
        </View>
      ) : (
        <View style={{ height: "100%", width: "100%" }}>
          <Image style={styles.corners} source={corners}></Image>
          <Camera
            flashMode={flash}
            style={styles.camera}
            type={type}
            ratio="18:9"
            ref={(ref) => {
              setCameraRef(ref);
            }}
          ></Camera>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "#75B956",
                width: 70,
                height: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                marginRight: 20,
              }}
              onPress={pickImage}
            >
              <Icon name="image" size={28} color="white" style={{}} />
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                style={styles.takePictureBtn}
                onPress={takePicture}
              >
                <ScanOutlined
                  style={{
                    color: "white",
                    fontSize: 50,
                  }}
                  name="line-scan"
                ></ScanOutlined>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#75B956",
                width: 70,
                height: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={toggleFlash}
            >
              <Feather
                name={
                  flash === Camera.Constants.FlashMode.off ? "zap-off" : "zap"
                }
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    bottom: 50,
    width: "100%",
    justifyContent: "center",
    zIndex: 3,
  },
  takePictureBtn: {
    backgroundColor: "#3E7C1F",
    borderRadius: 50,
    height: 90,
    width: 90,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  corners: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  picture: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nextBtn: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    left: 95,
  },
  nextText: {
    color: "green",
    fontSize: 16,
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
});
