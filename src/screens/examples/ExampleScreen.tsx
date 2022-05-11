import { useTheme } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "../../components/Chart/Chart";
import { fetchTradingCharts } from "../../data/api/dexscreener/dexscreenerDataProvider";
import ChartModel from "../../data/models/Chart";

const ExampleScreen = () => {
	const [bars, setBars] = useState<ChartModel[]>([]);
	const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
	const fetchDetails = useCallback((timestamp, count) => {
		fetchTradingCharts("bsc", "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE", timestamp - 15 * count * 60 * 1000, timestamp, 15, count).then((details) => {
      setBars(details)
		}).catch((err) => {
			console.error(err);
		}).finally (() => {})
	}, []);

	useEffect(() => {
		fetchDetails(new Date().getTime(), 300)
	}, []);


	return(
		<SafeAreaView style={styles.container}>
			<Chart candles={bars}/>
		</SafeAreaView>
	)
};
  
export default ExampleScreen

const createStyles = (colors) => StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
