import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import ConstInput from '../../components/ConstInput';
import ConstButton from '../../components/ConstButton';
import TextButton from '../../components/TextButton';

const SeecondScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);

  const [fontLoaded] = useFonts({
    'Zen Dots Regular': require('./../../assets/fonts/ZenDots-Regular.ttf'),
    'Bungee Spice Regular': require('./../../assets/fonts/BungeeSpice-Regular.ttf'),
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
      <Image style={{width: 440, height: "100%", marginTop: "140%"}} source={require('./../../assets/images/header.png')}></Image>
      <LinearGradient
        colors={['rgba(45, 82, 178, 1)', 'rgba(45, 82, 178, 0.2)']}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        start={[0, 0 ]}
        end={[0, 1]}
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
        <ConstInput name="ios-person-outline"></ConstInput>
        <ConstInput name="ios-lock-closed-outline"></ConstInput>
        <ConstButton title="Sign In"></ConstButton>
        <TextButton title="Forgot Password?"></TextButton>
      </View>
      

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '60%',
          width: '100%',
          position: 'relative',
        }}
      >
        <View style={{width:"100%", padding: 10}}>
          
        </View>
        


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

export default SeecondScreen;
