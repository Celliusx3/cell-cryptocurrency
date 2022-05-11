import Chain from "./Chain";
import Protocol from "./Protocol";

export default class AccountBalance {
  total: number
  chains: Chain[]


	constructor(total: number, protocols: Chain[]) {
		this.total = total;
    this.chains = protocols;
	}
}