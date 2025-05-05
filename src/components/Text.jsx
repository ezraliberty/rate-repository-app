import { Text as NativeText, StyleSheet, Platform } from 'react-native';

import theme from '../theme';
import FontIOS from './Font.ios';
import FontAndroid from './Font.android';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  navColorPrimary: {
    color: theme.colors.cardColor,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  let fontFamilyStyle = {};
  if (Platform.OS === 'ios') {
    fontFamilyStyle = FontIOS.main || {};
  } else if (Platform.OS === 'android') {
    fontFamilyStyle = FontAndroid.main || {};
  }

  const textStyle = [
    styles.text,
    fontFamilyStyle,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'navText' && styles.navColorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;