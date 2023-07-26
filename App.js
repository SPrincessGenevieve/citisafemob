import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';

import FirstScreen from './screen/login/FirstScreen';
import SecondScreen from './screen/login/SecondScreen';

const { height } = Dimensions.get('window');

function App() {
  const scrollViewRef = useRef(null);
  const currentScreenIndex = useRef(0);

  const handleSwipe = (event) => {
    const offsetY = event.nativeEvent.translationY;
    scrollViewRef.current.getNode().scrollTo({ y: -currentScreenIndex.current * height - offsetY, animated: false });
  };

  return (
    <View style={styles.container}>
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
          <View style={styles.screenContainer}>
            <FirstScreen />
          </View>

          <View style={styles.screenContainer}>
            <SecondScreen />
          </View>
          
        </ScrollView>
      </PanGestureHandler>
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
