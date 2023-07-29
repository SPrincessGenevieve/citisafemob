import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';

import FirstScreen from './screen/login/FirstScreen';
import SecondScreen from './screen/login/SecondScreen';
import HomeScreen from './screen/home/HomeScreen';

const { height } = Dimensions.get('window');

function App() {
  const scrollViewRef = useRef(null);
  const currentScreenIndex = useRef(0);

  const handleSwipe = (event) => {
    const offsetY = event.nativeEvent.translationY;
    scrollViewRef.current.getNode().scrollTo({ y: -currentScreenIndex.current * height - offsetY, animated: false });
  };

  const [appear, setAppear] = useState(true)
  const [appearHome, setAppearHome] = useState(false)

  return (
    <View style={styles.container}>
      {appear ? 
        <>
        <PanGestureHandler onGestureEvent={handleSwipe}>
        <ScrollView
          ref={scrollViewRef}
          vertical
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            currentScreenIndex.current = Math.round(offsetY / height);
          }}
          scrollEventThrottle={1}
        >
          {/* SCREEN */}
          <View style={styles.screenContainer}>
            <FirstScreen />
          </View>

          <View style={styles.screenContainer}>
            <SecondScreen onPress={() => setAppear(!appear) & setAppearHome(!appearHome)}/>
          </View>
          
        </ScrollView>
      </PanGestureHandler></>
      : null}
      {appearHome ? <HomeScreen onPress={() => setAppearHome(!appearHome) & setAppear(!appear)}></HomeScreen> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    height,
  },
});

export default App;
