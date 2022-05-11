export default class CryptoPair {
  id: string;
	pairAddress: string;
	pairSymbols: string;
	priceUsd: string;
	dexImg: string;
	platformImg: string;
	priceChange24: number;
	platformId: string;
	volume24: number;

	constructor(id: string, pairAddress: string, pairSymbols: string, priceUsd: string, dexImg: string, platformImg: string, priceChange24: number, platformId: string, volume24: number) {
		this.id = id;
		this.pairAddress = pairAddress;
		this.pairSymbols = pairSymbols;
    this.priceUsd = priceUsd;
		this.dexImg = dexImg;
		this.platformImg = platformImg;
		this.priceChange24 = priceChange24;
		this.platformId = platformId;
		this.volume24 = volume24;
	}
}