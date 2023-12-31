import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Text,
} from "react-native";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync, // Fixed typo here
} from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { setRecognizedText } from "./camera/infoSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";
import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import corners from "./../../assets/corners.png";
import ConstButtonShort from "./../components/ConstButtonShort";

export default function CameraScan() {
  const [cameraMode, setCameraMode] = useState(CameraType.back);
  const [flash, setFlash] = useState("off"); // Changed to string type
  const [pictureUri, setPictureUri] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr
  const [cropMode, setCropMode] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState("");

  const [imageManipulatorVisible, setImageManipulatorVisible] = useState(false);
  const [croppedImageUri, setCroppedImageUri] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleFlash = () => {
    setFlash((currentFlash) =>
      currentFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

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
  });

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

  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;

  const takePicture = async () => {
    if (cameraRef) {
      const uri = await cameraRef.takePictureAsync();

      setCapturedImage(uri.uri); // Set the captured image URI directly
      setCropMode(true);
      setShowPicture(true);
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

      const apiKey = "5f9a18dcb66e4eca17af461b4b619bc9";
      const apiUrl =
        "https://api.mindee.net/v1/products/SPrincessGenevieve/gems/v1/predict";

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
            type: concatenatedFields.type,
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
          })
        );
      } else {
        Alert.alert("Text extraction failed. Please try again later.");
      }
    } catch (error) {
      console.log("Error extracting text:", error);
      Alert.alert("Error extracting text. Please try again later.");
    }
    navigation.navigate("CameraScanOCR");
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
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
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
            <>
              <Image style={styles.picture} source={{ uri: capturedImage }} />
            </>
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
            <View
              style={{
                position: "absolute",
                zIndex: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                top: -550,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Photo of Driver’s License
              </Text>
              <Text style={{ color: "white" }}>
                Please place the front of the Driver’s License
              </Text>
              <Text style={{ color: "white" }}>in the frame</Text>
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
    padding: 15,
    paddingHorizontal: 50,
    marginLeft: -50,
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
    padding: 15,
    right: 95,
    paddingHorizontal: 50,
  },
  cancelText: {
    color: "red",
    fontSize: 16,
  },
});
