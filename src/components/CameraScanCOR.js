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
import Feather from "@expo/vector-icons/Feather";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { setRecognizedText } from "./camera/infoSliceCOR";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function CameraScanCOR() {
  const [cameraMode, setCameraMode] = useState(CameraType.back);
  const [flash, setFlash] = useState("off"); // Changed to string type
  const [pictureUri, setPictureUri] = useState("");
  const cameraRef = useRef();
  const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr

  const dispatch = useDispatch();
  const navigation = useNavigation();


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
    try {
      const { uri } = await cameraRef?.current.takePictureAsync();

      setPictureUri(uri);
      setShowPicture(true);
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  const cancelPicture = () => {
    setPictureUri("");
    setShowPicture(false);
  };

  const handleNextButton = async () => {
    navigation.navigate("FormScreen");
  };

  
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
      setPictureUri(result.uri); // Use result.uri directly
      setShowPicture(true);
    }
  };

  return (
    <View style={styles.container}>
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
            <Feather name="image" size={35} color="white" onPress={pickImage} />
            <TouchableOpacity
              style={styles.takePictureBtn}
              onPress={takePicture}
            />
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
          <Text style={styles.cardText}>
            Place the Certificate of Registration here
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
    width: 390,
    height: 745,
    borderWidth: 3,
    borderRadius: 19,
    borderColor: "white",
    position: "absolute",
    zIndex: 1,
    top: "45%",
    left: "45%",
    marginLeft: -173,
    marginTop: -370,
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
