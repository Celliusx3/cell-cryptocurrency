import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native";
import WalletModel from "../../data/models/Wallet";
import Text from "../Text/Text";
import Token from "../Token/Token";

interface WalletProps {
	wallet: WalletModel,
  containerStyle: ViewStyle
}

const Wallet = ({wallet: {tokens}, containerStyle}: WalletProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
	return(
		<View style={{...styles.container, ...containerStyle}}>
      <Text style={styles.title} text={"Wallet"}/>
      {
        tokens.map ((token, index) => {
          return (
            <Token key={token.id} token={token}/>
          )
        })
      }
    </View>
	)
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    padding: 8,
    borderRadius: 4
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1
	},
});

export default Wallet;
  