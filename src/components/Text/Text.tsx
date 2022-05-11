import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text as RNText } from "react-native";

interface TextProps {
	text: string
  style?: TextStyle
  adjustsFontSizeToFit?: boolean | undefined;
  numberOfLines?: number | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
}

const Text = ({text, adjustsFontSizeToFit, numberOfLines, ellipsizeMode, style}: TextProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

	return(
    <RNText 
      adjustsFontSizeToFit={adjustsFontSizeToFit} 
      numberOfLines={numberOfLines} 
      ellipsizeMode={ellipsizeMode}
      style={{...styles.text, ...style}}>
        {text}
    </RNText>
	)
};

const createStyles = (colors) => StyleSheet.create({
  text: {
    color: colors.text
	},
})


export default Text;
  