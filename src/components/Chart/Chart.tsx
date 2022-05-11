import { useTheme } from "@react-navigation/native";
import React, { useMemo, useRef } from "react";
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import CandleModel from "../../data/models/Chart";


interface ChartProps {
	candles: CandleModel[],
}

const Chart = ({candles}: ChartProps) => {
  const webViewRef = useRef<WebView | null>(null);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return <WebView
    ref={webViewRef}
    style={styles.container}
    source={{
      html: `
    <html>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      <script type="text/javascript" src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
    </head>
    <body style="width: 100vw; height: 100vh; margin: 0px; position: relative; font-family: arial">
      <div id="chart_div"></div>
    </body>
    <script type="text/javascript">
      var chart = LightweightCharts.createChart(document.getElementById("chart_div"), {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
        layout: {
          backgroundColor: "${styles.layout.backgroundColor}",
          textColor: "${styles.layout.textColor}",
        },
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal,
        },
        grid: {
          vertLines: {
            color: "${styles.verticalGrid.color}",
          },
          horzLines: {
            color: "${styles.horizontalGrid.color}",
          },
        },
        timeScale: {
          timeVisible: true,
          borderColor: "${styles.timeAxis.color}",
          fitContent: true
        },
        rightPriceScale: {
          borderColor: "${styles.timeAxis.color}"
        },
      });
      var candleSeries = chart.addCandlestickSeries({
        upColor: "${styles.candleStickUp.color}",
        downColor: "${styles.candleStickDown.color}",
        borderDownColor: "${styles.candleStickDown.color}",
        borderUpColor: "${styles.candleStickUp.color}",
        wickDownColor: "${styles.candleStickDown.color}",
        wickUpColor: "${styles.candleStickUp.color}",
      });
      var data = JSON.parse(\`${JSON.stringify(candles.map((candle) => ({
        time: candle.timestamp, open: candle.open, high: candle.high, low: candle.low, close: candle.close })))}\`);
      candleSeries.setData(data);
      function gotPrice(price) {
        if(candleSeries) {
          data[data.length-1] = {
            time: data[data.length-1].time, 
            high: data[data.length-1].high >= price ? data[data.length-1].high : price,
            low: data[data.length-1].low <= price ? data[data.length-1].low : price, 
            open: data[data.length-1].open,
            close: price, 
          }
          candleSeries.update(data[data.length-1]);
        }
      }
    </script>
  </html>`
    }}
  />
};

export default Chart;

const createStyles = (colors) => StyleSheet.create({
  container: {
		backgroundColor: colors.background,
  },
  layout: {
    backgroundColor: colors.background,
    textColor: colors.text,
  },
  verticalGrid: {
    color: colors.border
  },
  horizontalGrid: {
    color: colors.border
  },
  timeAxis: {
    color: colors.border
  },
  priceAxis: {
    color: colors.border
  },
  candleStickUp: {
    color: colors.positive
  },
  candleStickDown: {
    color: colors.negative
  }
});