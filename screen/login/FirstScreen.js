import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const FirstScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);

  const [fontLoaded] = useFonts({
    'Zen Dots Regular': require('./../../assets/fonts/ZenDots-Regular.ttf'),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/BGPhoto.png')}
        style={{ position: 'absolute', height: '100%' }}
      />
      <LinearGradient
        colors={['rgba(45, 82, 178, 1)', 'rgba(45, 82, 178, 0.2)']}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        start={[0, 1]}
        end={[0, 0]}
      />
      <View
        style={{
          width: '80%',
          height: '30%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '35%',
        }}
      >
        <Image
          style={{
            height: 260,
            width: 260,
          }}
          source={require('./../../assets/images/logo.png')}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          height: '10%',
          position: 'absolute',
          marginTop: '40%',
        }}
      >
        <Text
          style={{
            color: 'white',
            alignItems: 'center',
            fontSize: 51,
            justifyContent: 'center',
            fontFamily: 'Zen Dots Regular',
            marginTop: '20%'
          }}
        >
          CITISAFE
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '40%',
          width: '80%',
          position: 'relative',
          marginTop: '90%',
        }}
      >
        {isVisible && (
          <>
            <Animated.Image
              style={{
                opacity: 0.2,
                opacity: fadeAnim, // Apply fade animation to the image
              }}
              source={require('./../../assets/images/up.gif')}
            />
            <Animated.Text
              style={{
                fontSize: 30,
                opacity: 0.2,
                color: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                marginTop: '92%',
                opacity: fadeAnim, // Apply fade animation to the text
              }}
            >
              Swipe
            </Animated.Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FirstScreen;
