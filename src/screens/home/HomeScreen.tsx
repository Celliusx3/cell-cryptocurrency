import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableHighlight, View } from 'react-native';
import FastImage from "react-native-fast-image";
import { SvgFromUri } from "react-native-svg";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import { useCryptoPairs } from "../../data/api/dexscreener/dexscreenerDataProvider";
import CryptoPair from "../../data/models/CryptoPair";
import { RootStackParamList } from "../../navigation/routes";
import { ThemeContext } from "../../themes/Theme";
import { formatCompact } from "../utilities/text";

const HomeScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [socket, data] = useCryptoPairs();
	const { theme: {colors} } = useContext(ThemeContext);

  useEffect(() => {
    const focusListener = () => {
      if (socket)
        socket.open()
    }

    const blurListener = () => {
      if (socket)
        socket.close()
    }

    navigation.addListener('focus', focusListener);
    navigation.addListener('blur', blurListener);

    return () => {
      navigation.removeListener('focus', focusListener)
      navigation.removeListener('blur', blurListener)
    } 
	}, []);

  const renderItem = useCallback((item: CryptoPair) => {
		return (
      <View key={item.id} style= {{flexDirection: 'row',overflow:'hidden', borderRadius: 4, borderWidth: 1, borderColor:colors.border, marginVertical: 4, marginHorizontal: 8}}>
         <TouchableHighlight onPress = {() => navigation.navigate("Details", { platform: item.platformId, pair: item.pairAddress })} underlayColor={colors.border} style={{flex: 1, padding: 8}}>
          <View style={{flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
            <View style={{flex:1, flexDirection:"column"}}>
              <View style={{flexDirection: "row"}}>
                <SvgFromUri
                  width={16}
                  height={16}
                  viewBox="0 0 128 128"
                  uri= {item.platformImg}/>
                <FastImage
                  style={{ width: 16, height: 16 }}
                  source={{uri: item.dexImg}}
                  resizeMode={FastImage.resizeMode.contain}/>
              </View>
              <Text text={item.pairSymbols}/>
              <Text text={`Vol: $${formatCompact(item.volume24, 0)}`}/>
            </View>
            <View style={{flex: 1, flexDirection:"column", alignItems:"flex-end"}}>
              <Text 
                text={item.priceUsd}
                adjustsFontSizeToFit
                numberOfLines={1}
              />
            </View>

            <View style={{flex:1, flexDirection:"column", alignItems:"flex-end"}}>
              <Card style={{backgroundColor: item.priceChange24 < 0 ? colors.negative: colors.positive}}>
                <Text text={`${(item.priceChange24/100.0).toLocaleString("en-US", {style:"percent", maximumFractionDigits: 2})}`}/>  
              </Card>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
	}, []);

	return(
		<SafeAreaView>
      <ScrollView showsVerticalScrollIndicator= {false}>
        {
          data.map((d, index) => 
            renderItem(d)           
          )
        }
      </ScrollView>
		</SafeAreaView>
	)
};

export default HomeScreen;
  
