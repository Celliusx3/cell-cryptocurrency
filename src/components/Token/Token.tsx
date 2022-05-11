import { useTheme } from "@react-navigation/native";
import React, { ReactNode, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import TokenModel from "../../data/models/Token";
import Text from "../Text/Text";

interface TokenProps {
	token: TokenModel,
}

const Token = ({token}: TokenProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
	return(
		<View style={styles.container}>
      <FastImage
        style={styles.logo}
        source={{uri: token.logo}}
        resizeMode={FastImage.resizeMode.contain}/>

      <Text style={styles.token} text={`${token.amount.toLocaleString("en-US", {minimumFractionDigits: 4, maximumFractionDigits: 4})} ${token.symbol}`}/>

      <Text style={styles.total} text={`$${token.getTotalPrice().toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}/>
  
    </View>
	)
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent:"space-between",
    alignItems: "center"
  },
  logo: {
    width: 16, 
    height: 16, 
    marginEnd: 4
	},
  token: {
    fontSize: 16,
    flex: 1
  },
  total: {
    fontSize: 16,
  }
});

export default Token;
  