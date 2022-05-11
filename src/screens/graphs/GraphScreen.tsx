import { useTheme } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "../../components/Chart/Chart";
import { fetchTradingCharts } from "../../data/api/dexscreener/dexscreenerDataProvider";
import ChartModel from "../../data/models/Chart";
import { DetailsContext } from "../../navigation/routes";

const GraphScreen = () => {
	const [bars, setBars] = useState<ChartModel[]>([]);
	const { colors } = useTheme();
	const { platform, pair } = useContext(DetailsContext);
  const styles = useMemo(() => createStyles(colors), [colors]);
	const [refreshing, setRefreshing] = React.useState(false);

	const fetchDetails = useCallback((timestamp, count) => {
		fetchTradingCharts(platform, pair, timestamp - 15 * count * 60 * 1000, timestamp, 15, count).then((details) => {
      setBars(details)
		}).catch((err) => {
			console.error(err);
		}).finally (() => {
			setRefreshing(false)
		})
	}, []);

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDetails(new Date().getTime(), 300)
  }, []);

	useEffect(() => {
		onRefresh()
	}, []);

	return(
		<SafeAreaView style={styles.container}>
			<ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
        }>
        <Chart candles={bars}/>
			</ScrollView>
		</SafeAreaView>
	)
};
  
export default GraphScreen

const createStyles = (colors) => StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: colors.background
  },
	scrollContainer: {
    flex: 1,
  },
});
