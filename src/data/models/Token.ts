export default class Token {
  id: string
  name: string
  symbol: string
  logo: string
  price: number
  amount: number

	constructor(id: string, name: string, symbol: string, logo: string, price: number, amount: number) {
		this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.logo = logo;
    this.price = price;
    this.amount = amount;
	}

  getTotalPrice(): number {
    return this.price * this.amount;
  }
}