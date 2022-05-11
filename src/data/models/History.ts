export default class History {
  id: number;
	blockNumber: number;
	volumeUsd: string;
	priceUsd: string;
	txnHash: string;
  type: string;
	timestamp: string;

	constructor(id: number, blockNumber: number, volumeUsd: string, priceUsd: string, txnHash: string, type: string, timestamp: string) {
		this.id = id;
		this.blockNumber = blockNumber;
		this.volumeUsd = volumeUsd;
		this.priceUsd = priceUsd;
    this.txnHash = txnHash;
    this.type = type;
		this.timestamp = timestamp;
	}
}