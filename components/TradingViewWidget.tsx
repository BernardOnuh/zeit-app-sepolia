// @ts-nocheck
// TradingViewWidget.jsx

import React, { useEffect, useRef, useState } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget({symbol}) {

  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_23136") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "H",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_23136",
        });
      }
    }
  }, [symbol]);

  // const chartContainerStyle = {
  //   height: "100vh",
  //   width: "100%",
  // };


  return (
    <div>
      <div className="tradingview-widget-container w-full" style={{height: "100vh"}}>
        <div
          id="tradingview_23136"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        />
        {/* <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div> */}
      </div>
      {/* <div>
        <button onClick={() => handleSymbolChange("BTCUSD")}>BTC/USD</button>
        <button onClick={() => handleSymbolChange("ETHUSD")}>ETH/USD</button>
        <button onClick={() => handleSymbolChange("BTCETH")}>BTC/ETH</button>
        <button onClick={() => handleSymbolChange("USDCUSDT")}>USDC/USDT</button>
      </div> */}
    </div>
  );
}
