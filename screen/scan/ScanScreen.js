import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import RNTextDetector from 'react-native-tesseract-ocr'

function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState(true);
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const scanImage = async () => {
    try {
      if (!image) {
        console.warn('No image to scan.');
        return;
      }

      const tesseractOptions = {
        whitelist: null,
        blacklist: null,
      };
      const extractedText = await RNTextDetector.detectFromUri(image, tesseractOptions);
      console.log('Extracted Text:', extractedText);

      // Update the result state with the extracted text
      setResult(extractedText);

    } catch (error) {
      console.error('Error during OCR:', error);
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      setShowCamera(false);
    }
  };

  const recaptureImage = () => {
    setShowCamera(true);
    setImage(null);
    setResult(''); // Reset the OCR result when recapturing the image
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ backgroundColor: "black", position: "absolute", height: "100%", width: "100%" }}>
      {showCamera ? (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type} ratio={'16:9'} />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.capturedImage}></Image>
        </View>
      )}

      {showCamera ? (
        <View style={styles.imageButtonsContainer}>
          <IconButton iconColor='white' onPress={takePicture} size={40} style={{ fontSize: 100 }} icon="camera"></IconButton>
          <IconButton iconColor='white' onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} size={40} style={{ fontSize: 100 }} icon="camera-switch"></IconButton>
        </View>
      ) : (
        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity style={styles.recaptureButton} onPress={recaptureImage}>
            <Text style={styles.proceedButtonText}>Recapture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.proceedButton} onPress={scanImage}>
            <Text style={styles.proceedButtonText}>Scan ID</Text>
          </TouchableOpacity>
        </View>
      )}

      {result !== '' && (
        <View style={{ backgroundColor: "pink", height: 400, width: 400, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    
  },
  camera: {
    height: "90%",
    width: "110%"
  },
  imageContainer: {
    backgroundColor:"white",
    position:"absolute",
    height:"90%",
    width: "110%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    flex: 1,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  captureButton: {
    backgroundColor: '#14274e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 20,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
  },
  flipButton: {
    backgroundColor: '#14274e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  flipButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add some opacity to the background for the buttons
  },
recaptureButton: {
    backgroundColor: '#14274e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  recaptureButtonText: {
    color: 'white',
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#14274e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    width: 90,
    textAlign:"center"
  },
});

export default ScanScreen;