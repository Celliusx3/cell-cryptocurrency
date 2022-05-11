import Portfolio from "./Portfolio"

export default class Protocol {
  id: string
  chain: string
  name: string
  url: string
  logo: string
  portfolio: Portfolio[]
  
	constructor(id: string, chain: string, name: string, url: string, logo: string, portfolio: Portfolio[]) {
    this.id = id;
    this.chain = chain;
		this.name = name;
    this.url = url;
    this.logo = logo;
    this.portfolio = portfolio;
	}
}