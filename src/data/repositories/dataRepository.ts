import { fetchWalletBalance } from "../api/debank/debankDataProvider";
import { fetchBalance, fetchComplexProtocolList, fetchTokenList } from "../api/openDebank/openDebankDataProvider";
import AccountBalance from "../models/AccountBalance";
import Chain from "../models/Chain";
import Portfolio from "../models/Portfolio";
import Protocol from "../models/Protocol";
import Token from "../models/Token";
import Wallet from "../models/Wallet";

export const fetchAccountBalance = async (id: string): Promise<AccountBalance> => {
  try{
    // 0xc9e8c434921a5e67D306C8EA0d84345D45fB8447
    const balance = await fetchBalance(id);
    const chains = balance.chain_list.filter(x => x.usd_value > 0)
    
    const response = await Promise.all(chains.map(async (chain) => {
      const contents = await fetchWalletBalance(id, chain.id)
        .then ( y => new Wallet(y.data.map(z => new Token(z.id, z.name, z.symbol, z.logo_url, z.price, z.balance / (10**z.decimals)))))
        
      const protocols = await fetchComplexProtocolList(id, chain.id)
        .then ( y => y.map (z => new Protocol(z.id, z.chain, z.name, z.site_url, z.logo_url,
          z.portfolio_item_list.map(a => new Portfolio(a.pool_id, a.name, a.stats.asset_usd_value, a.stats.debt_usd_value, a.stats.net_usd_value,
            a.detail.supply_token_list?.map (b => new Token(b.id, b.name, b.symbol, b.logo_url, b.price, b.amount)) ?? []
          )))))

      return new Chain(
        chain.native_token_id,
        chain.name, 
        chain.usd_value,
        chain.logo_url,
        protocols,
        contents
      )
    }));

    return new AccountBalance(balance.total_usd_value, response);
  }catch(error){
    throw error;
  }
}