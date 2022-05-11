import { useTheme } from "@react-navigation/native";
import React, { ReactNode, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native";

interface CardProps {
	children: ReactNode,
  style?: ViewStyle
}

const Card = ({children, style}: CardProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
	return(
		<View style= {{...styles.container, ...style}}>
      {children}
    </View>
	)
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 4,
    padding: 8
	},
});

export default Card;
  