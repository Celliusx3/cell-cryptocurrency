import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import ChainModel from "../../data/models/Chain";
import Protocol from "../Protocol/Protocol";
import Text from "../Text/Text";
import Token from "../Token/Token";
import Wallet from "../Wallet/Wallet";

interface ChainProps {
	chain: ChainModel,
}

const Chain = ({chain: {name, logo, total, wallet, protocols}}: ChainProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
	return(
    <View style= {styles.container}>
      <View style={styles.header}>
        <FastImage
          style={styles.logo}
          source={{uri: logo}}
          resizeMode={FastImage.resizeMode.contain}/>
        <Text style={styles.title} 
          text={name}/>

        <Text style={styles.total} 
          text={`$${total.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}/>
      
      </View>
      
      <Wallet
        wallet={wallet}
        containerStyle = {{marginVertical: 4}}
      />
      {
        protocols.map ((protocol, index) => {
          return (
            <Protocol 
              key={protocol.id}
              containerStyle = {{marginVertical: 4}}
              protocol={protocol}/>
          )
        })
      }
    </View>
	)
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    overflow:'hidden', 
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor:colors.border, 
    marginVertical: 4, 
    marginHorizontal: 8
  },
  header: {
    flexDirection: "row", 
    justifyContent:"space-between",
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center"
  },
  logo: {
    width: 24,
    height: 24, 
    marginEnd: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", 
    marginEnd: 8,
    flex: 1
	},
  total: {
    fontSize: 18,
    fontWeight: "bold"
  },
  portfolio: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1
  }
});

export default Chain;
  