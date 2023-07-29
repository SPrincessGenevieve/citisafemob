// CustomFonts.js
import * as Font from 'expo-font';

const customFonts = {
  'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf'),
  'Zen Dots Regular': require('./../assets/fonts/ZenDots-Regular.ttf'),
  'Roboto Thin': require('./../assets/fonts/Roboto-Thin.ttf'),
};

export const loadCustomFonts = async () => {
  await Font.loadAsync(customFonts);
};

export default customFonts;
