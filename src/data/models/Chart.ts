export default class Chart {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;

	constructor(timestamp: number, open: string, high: string, low: string, close: string) {
		this.timestamp = timestamp;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
	}
}