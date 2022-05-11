import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import ProtocolModel from "../../data/models/Protocol";
import Text from "../Text/Text";
import Token from "../Token/Token";

interface ProtocolProps {
	protocol: ProtocolModel,
  containerStyle: ViewStyle
}

const Protocol = ({protocol: {name, logo, portfolio}, containerStyle}: ProtocolProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
	return(
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.header}>
        <FastImage
          style={styles.logo}
          source={{uri: logo}}
          resizeMode={FastImage.resizeMode.contain}/>
        <Text style={styles.title} text={`${name}`}/>
      </View>
      {
        portfolio.map((portfolio, index) => {
          return (
            <View>
              <Text style={styles.portfolio} text={`${portfolio.name}`}/>
              {
                portfolio.tokens.map ((token, index) => {
                  return (
                    <Token key={token.id} token={token}/>
                  )
                })
              }
            </View>
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
  header: {
    paddingVertical:4,
    alignItems: "center",
    justifyContent:"space-between",
    flexDirection:"row"
  },
  logo: {
    width: 18,
    height: 18, 
    marginEnd: 4
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1
	},
  portfolio: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1
  }
});

export default Protocol;
  