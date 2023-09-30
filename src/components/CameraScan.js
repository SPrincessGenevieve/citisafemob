import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, requestCameraPermissionsAsync } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";
import { Button } from "react-native";
import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "react-native";
import corners from "./../../assets/corners.png";
import * as ImagePicker from "expo-image-picker";
import { setRecognizedText } from "./camera/infoSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function CameraScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [cropMode, setCropMode] = useState(false);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [showPicture, setShowPicture] = useState(false);
  const [imageManipulatorVisible, setImageManipulatorVisible] = useState(false);
  const [croppedImageUri, setCroppedImageUri] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // saving data
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const imagePickerPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status === "granted" &&
        imagePickerPermission.status === "granted"
      ) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();

      setCapturedImage(photo.uri);
      setCropMode(true);
      setShowPicture(true);
    }
  };

  const cancelPicture = async () => {
    setCapturedImage("");
    setShowPicture(false);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [18, 9],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result;

        const croppedImage = await ImageManipulator.manipulateAsync(
          uri,
          [
            {
              crop: {
                originX: 0,
                originY: 0,
                width: Math.min(200, result.width),
                height: Math.min(200, result.height),
              },
            },
          ],
          { format: ImageManipulator.SaveFormat.PNG }
        );

        setCapturedImage(croppedImage.uri); // Update the capturedImage state with the cropped image URI
        setCropMode(false);
        setShowPicture(true);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  const toggleFlash = () => {
    setFlash((currentFlash) =>
      currentFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const handleNextButton = async () => {
    navigation.navigate("IntroOCR");
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

          <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancelPicture}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
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
