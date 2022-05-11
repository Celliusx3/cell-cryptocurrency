import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";
import Chain from "../../components/Chain/Chain";
import { fetchTransaction } from "../../data/api/chains/chainDataProvider";
import AccountBalance from "../../data/models/AccountBalance";
import { fetchAccountBalance } from "../../data/repositories/dataRepository";
import { RootStackParamList } from "../../navigation/routes";

const AccountDetailsScreen = () => {
	const route = useRoute<RouteProp<RootStackParamList, "AccountDetails">>()
	const platform = useMemo<string>(() => route.params!.platform, [])
	const transactionId = useMemo<string>(() => route.params!.transactionId, [])
	const [refreshing, setRefreshing] = React.useState(false);
	const [details, setDetails] = useState<AccountBalance|null>(null);
	
	const fetchDetails = useCallback(() => {
    fetchTransaction(platform, transactionId).then((details) => {
			return fetchAccountBalance(details.senderId)
		}).then((details) => {
      setDetails(details);
		}).catch((err) => {
			console.error(err);
		}).finally (() => {
			setRefreshing(false)
		})
	}, []);

	useEffect(() => {
		onRefresh()
	}, []);

	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDetails()
  }, []);

	return(
		<SafeAreaView>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{
					details?.chains && details.chains.map((d, index) => (
						<Chain key={d.id} chain={d}/>   		
					))
				}
			</ScrollView>
		</SafeAreaView>
	)
};
  
export default AccountDetailsScreen;

