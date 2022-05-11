import Token from "./Token";

export default class Wallet {
  tokens: Token[]
  
	constructor(tokens: Token[]) {
    this.tokens = tokens;
	}
}