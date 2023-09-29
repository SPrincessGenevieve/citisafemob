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
  getCameraPermissionsAsync,
} from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { setRecognizedText } from "./camera/infoSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";

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
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();

      setPictureUri(uri); // Set the captured image URI directly
      setShowPicture(true);
    }
  };

  const cancelPicture = () => {
    setPictureUri("");
    setShowPicture(false);
  };

  const handleNextButton = async () => {
    try {
      if (!pictureUri) {
        Alert.alert("Please take a picture first.");
        return;
      }

      const apiKey = "5f9a18dcb66e4eca17af461b4b619bc9";
      const apiUrl =
        "https://api.mindee.net/v1/products/SPrincessGenevieve/gems/v1/predict";

      const formData = new FormData();
      formData.append("document", {
        uri: pictureUri,
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
    navigation.navigate("CameraScanCOR");
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
      setPictureUri(result.assets[0].uri);
      setShowPicture(true);
    }
  };

  return (
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
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={cameraMode}
            flashMode={flash}
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
                marginLeft: 50,
              }}
              onPress={pickImage}
            >
              <Icon name="image" size={50} color="white" style={{}} />
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                style={styles.takePictureBtn}
                onPress={takePicture}
              >
                <ScanOutlined
                  style={{
                    color: "white",
                    fontSize: 70,
                  }}
                  name="line-scan"
                ></ScanOutlined>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={switchFlashMode}
              style={{
                backgroundColor: "#75B956",
                width: 70,
                height: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                marginLeft: 25,
              }}
            >
              <Feather
                name={flash === "off" ? "zap-off" : "zap"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!showPicture && (
        <View style={styles.cardoutline}>
          <Text style={styles.cardText}>
            Place the Driver's License Card Here
          </Text>
        </View>
      )}
    </View>
  );
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
    aspectRatio: 9 / 13,
  },
  controlsContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    bottom: 50,
  },
  takePictureBtn: {
    backgroundColor: "#75B956",
    borderRadius: 50,
    height: 90,
    width: 90,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 25,
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
    left: 95,
  },
  nextText: {
    color: "green",
    fontSize: 16,
  },
});
