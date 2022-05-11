import Token from "./Token"

export default class Portfolio {
  id: string
  name: string
  assetValue: number
  debtValue: number
  netValue: number
  tokens: Token[]
  
	constructor(id: string, name: string, assetValue: number, debtValue: number, netValue: number, tokens: Token[]) {
    this.id = id;
    this.name = name;
		this.assetValue = assetValue;
    this.debtValue = debtValue;
    this.netValue = netValue;
    this.tokens = tokens;
	}
}