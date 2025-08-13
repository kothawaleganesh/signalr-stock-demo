import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export default function StockDashboard() {

    const [stocks, setstocks] = useState({});

useEffect(() => {

let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5174/stockhub", { withCredentials: true }) // backend SignalR URL
    .withAutomaticReconnect()
    .build();

    connection.start()
    .then(() => console.log("Connected to SignalR hub"))
    .catch(err => console.error("Error connecting to SignalR hub:", err));

    // listen for stock updates
    connection.on("ReceiveStockUpdate", (symbol,price) => {
        setstocks(prevStocks =>( {
           ...prevStocks,
            [symbol]: price
        }));
    });

    return () => {
        connection.stop()
            .then(() => console.log("Disconnected from SignalR hub"))
            .catch(err => console.error("Error disconnecting from SignalR hub:", err));
    };
}, []);

  return (
    <div >
        <h1>Live Stock Dashboard</h1>
        <div>
          {Object.entries(stocks).map(([symbol, price]) => (
            <div key={symbol}>
              <h2>{symbol}</h2>
              <p>Price: ${price}</p>
            </div>
          ))}
    </div>
    </div>
  );
  }