import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, requestCameraPermissionsAsync } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { Image } from "react-native";
import corners from "./../../assets/corners.png";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";

export default function CameraScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cropMode, setCropMode] = useState(false);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [showPicture, setShowPicture] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    await requestCameraPermissionsAsync();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedImage(photo.uri);
      setCropMode(true);
      setShowPicture(true);
    }
  };

  const cancelPicture = () => {
    setCapturedImage(null);
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

        setCapturedImage(croppedImage.uri);
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

  const handleNextButton = () => {
    navigation.navigate("CameraScanCOR");
  };

  return (
    <View style={styles.container}>
      {showPicture && (
        <View style={styles.pictureContainer}>
          <Image style={styles.picture} source={{ uri: capturedImage }} />

          <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancelPicture}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {cropMode ? (
        <ExpoImageManipulator
          photo={{ uri: capturedImage }}
          isVisible
          onPictureChoosed={(uri) => setCapturedImage(uri)}
          onToggleModal={() => setCropMode(!cropMode)}
        />
      ) : (
        <View style={styles.cameraContainer}>
          <Image style={styles.corners} source={corners} />
          <Camera
            flashMode={flash}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ratio="18:9"
            ref={(ref) => {
              setCameraRef(ref);
            }}
          />

          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
              <Image source={require("your-icon-path")} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.takePictureBtn}
              onPress={takePicture}
            >
              <Image source={require("your-icon-path")} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleFlash}
            >
              <Image source={require("your-icon-path")} style={styles.icon} />
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
  pictureContainer: {
    backgroundColor: "red",
    position: "absolute",
    zIndex: 4,
    width: "100%",
    height: "100%",
  },
  picture: {
    flex: 1,
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
  cameraContainer: {
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  corners: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    width: "100%",
    zIndex: 3,
  },
  controlButton: {
    backgroundColor: "#75B956",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginHorizontal: 20,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
  takePictureBtn: {
    backgroundColor: "#75B956",
    borderRadius: 50,
    height: 90,
    width: 90,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
