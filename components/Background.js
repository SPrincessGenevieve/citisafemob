import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const Background = () => {
  const [isVisible, setIsVisible] = useState(true);


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 1)', 'rgba(45, 82, 178, 1)']}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        start={[0, 1]}
        end={[0, 0]}
      />
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

export default Background;
