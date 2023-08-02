import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import TextDetector from 'react-native-text-detector'; // Import the OCR package

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
};

function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);
  
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const response = await fetch(path);
      const blob = await response.blob();
  
      // Perform text detection on the image blob
      const visionResp = await TextDetector.detectFromUri(blob.uri, options);
      const recognizedText = visionResp.map(item => item.text).join(' ');
  
      navigation.navigate('OcrDetail', { resultText: recognizedText });
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText('');
    }
  
    setIsLoading(false);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync(options);
      if (!image.canceled) {
        const selectedAsset = image.assets[0];
        setImgSrc({ uri: selectedAsset.uri });
        await recognizeTextFromImage(selectedAsset.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.launchCameraAsync(options);
      if (!image.canceled) {
        const selectedAsset = image.assets[0];
        setImgSrc({ uri: selectedAsset.uri });
        await recognizeTextFromImage(selectedAsset.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
      <Text style={styles.title}>OCR TEXT</Text>
      <View style={{ alignSelf: 'center' }}>
        <Button
          disabled={isLoading}
          title="Settings"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </View>
      <Text style={styles.instructions}>Select an image source:</Text>
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Camera"
            onPress={() => {
              recognizeFromCamera();
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Gallery"
            onPress={() => {
              recognizeFromPicker();
            }}
          />
        </View>
      </View>
      {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ paddingHorizontal: 12, paddingTop: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  style={{ fontSize: 20, color: '#617A55' }}
                  title="Result"
                  onPress={() => {
                    recognizeTextFromImage(imgSrc.uri);
                  }}
                />
                <Button
                  title="Copy"
                  onPress={() => {
                    Clipboard.setString(text.toString());
                  }}
                />
              </View>
              <Text>{text}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WIDTH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default HomeScreen;
