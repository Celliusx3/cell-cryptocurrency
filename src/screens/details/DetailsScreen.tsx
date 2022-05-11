import { NavigationProp, useFocusEffect, useNavigation, useTheme } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View } from "react-native";
import Text from "../../components/Text/Text";
import { fetchTradingHistory } from "../../data/api/dexscreener/dexscreenerDataProvider";
import History from "../../data/models/History";
import { DetailsContext, RootStackParamList } from "../../navigation/routes";
import { ThemeContext } from "../../themes/Theme";

const DetailsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { platform, pair } = useContext(DetailsContext);
	const [history, setHistory] = useState<History[]>([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const { theme: {colors} } = useContext(ThemeContext);
	const styles = useMemo(() => createStyles(colors), [colors]);
	
	const fetchDetails = useCallback((timestamp?: number) => {
		fetchTradingHistory(platform, pair, timestamp).then((details) => {
			setHistory(details)
			// if (details && details.length > 0) {
			// 	if (history && history.length > 0) {
			// 		const alreadyAdded = details.findIndex(x=> x.id == history[0].id)
			// 		const filtered = (alreadyAdded >= 0) ? details.slice(0, alreadyAdded): details
			// 		setHistory(histories => [...filtered, ...histories])
			// 	} else {
			// 		setHistory(details)
			// 	}
			// }
		}).catch((err) => {
			console.error(err);
		}).finally (() => {
			setRefreshing(false)
		})
	}, [history]);

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDetails()
  }, []);

	useEffect(() => {
		onRefresh()
	}, []);

  const onClick = useCallback((item: History) => {
    navigation.navigate("AccountDetails", { platform: platform, transactionId: item.txnHash })
  }, []);

	const renderItem = useCallback((item: History, index: number) => {
		return (
      <View key={index} style= {{flexDirection: 'row',overflow:'hidden', borderRadius: 4, borderWidth: 1, borderColor:colors.border, marginVertical: 4, marginHorizontal: 8}}>
      	<TouchableHighlight onPress = {() => onClick(item)} underlayColor={colors.border} style={{flex: 1, padding: 8}}>
          <View style={{flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
            <View style={{flex:1, flexDirection:"column"}}>
              <Text text={`${item.timestamp}`}/>
							<Text text={item.txnHash} numberOfLines={1} ellipsizeMode={"middle"}/>
            </View>
            <View style={{flex:1, flexDirection:"column", alignItems:"flex-end"}}>
							<Text style={{color: item.type == 'buy' ? colors.positive: colors.negative}} text={item.type == 'buy' ? 'BUY' : 'SELL'}/>
							<Text style={{color: item.type == 'buy' ? colors.positive: colors.negative}} text={`$${item.volumeUsd}`}/>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
	}, []);

	return(
		<SafeAreaView style={styles.container}>
			<ScrollView
			 refreshControl={
				 <RefreshControl
					 refreshing={refreshing}
					 onRefresh={onRefresh}
				 />
			 }>
				{
					history.map((d, index) => 
						renderItem(d, index)           
					)
				}
			</ScrollView>
		</SafeAreaView>
	)
};
  
export default DetailsScreen;

const createStyles = (colors) => StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: colors.background
  },
});