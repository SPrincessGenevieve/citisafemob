import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";
import { Button } from "react-native";

export default function CameraScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cropMode, setCropMode] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
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
    }
  };

  const handleCropComplete = async () => {
    if (capturedImage) {
      // Get image info
      const imageSize = await ImageManipulator.getImageInfoAsync(capturedImage);

      // Adjust crop rectangle to be within the image boundaries
      const crop = {
        originX: 0,
        originY: 0,
        width: Math.min(200, imageSize.width),
        height: Math.min(200, imageSize.height),
      };

      // Crop the image using expo-image-manipulator
      // Crop the image using expo-image-manipulator
      const croppedImage = await ImageManipulator.manipulateAsync(
        capturedImage,
        [
          {
            rotate: 0, // Rotate the image to the correct orientation
          },
          {
            crop: {
              originX: 0,
              originY: 0,
              width: Math.min(200, imageSize.width),
              height: Math.min(200, imageSize.height),
            },
          },
        ],
        { format: ImageManipulator.SaveFormat.PNG }
      );

      // Pass the cropped image to ExpoImageManipulator
      setCapturedImage(croppedImage.uri);

      // Exit crop mode
      setCropMode(false);
    }
  };

  return (
    <View style={styles.container}>
      {cropMode ? (
        <View>
          <ExpoImageManipulator
            photo={{ uri: capturedImage }}
            isVisible
            onPictureChoosed={(uri) => setCapturedImage(uri)}
            onToggleModal={() => setCropMode(!cropMode)}
          />
          <Button
            title="Capture Again"
            onPress={() => setCapturedImage(null)}
          />
        </View>
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          ratio="18:9" // Set the aspect ratio of the camera view to 1:1
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={takePicture}
              type="primary"
            >
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
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
});
