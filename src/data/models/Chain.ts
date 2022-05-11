import Protocol from "./Protocol"
import Wallet from "./Wallet"

export default class Chain {
  id: string
  name: string
  total: number
  logo: string
  protocols: Protocol[]
  wallet: Wallet


	constructor(id: string, name: string, total: number, logo: string, protocols: Protocol[], wallet: Wallet) {
    this.id = id;
    this.name = name;
		this.total = total;
    this.logo = logo;
    this.protocols = protocols;
    this.wallet = wallet;
	}
}