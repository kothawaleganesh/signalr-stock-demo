Here’s a polished and beginner-friendly **README** for the **React frontend** of the *signalr-stock-demo* project — ideal for your GitHub repository. It clarifies purpose, setup, real-time theory, project structure, and usage in a clear, educational tone.

---

# SignalR Stock Demo — Frontend README

## Overview

This is the **front-end** React application of the SignalR Stock Demo project. It connects to a C# ASP.NET Core backend using **SignalR** to receive **real-time stock price updates** and displays them live—no page refresh needed!

### Why It Matters

Traditional web apps poll the server for new data. Here, the **server pushes updates** to the client in real time, creating a seamless, interactive experience akin to live financial dashboards, chat apps, or monitoring tools.

---

## What’s Inside

| File / Folder           | Purpose                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `src/StockDashboard.js` | Core logic: connects to SignalR, listens for updates, and renders stock prices live |
| `src/App.js`            | App entry point – includes the dashboard component                                  |
| `public/`               | Static assets and `index.html`                                                      |
| `package.json`          | Dependencies, scripts, and metadata                                                 |
| `README.md`             | Documentation (you're here!)                                                        |

---

## Getting Started

### Prerequisites

Ensure you have:

* **Node.js** (v16 or newer) — [Download here](https://nodejs.org/)
* **npm** or **yarn** — comes with Node.js installers

Check your setup:

```bash
node -v
npm -v
```

### Clone the Repository

```bash
git clone https://github.com/kothawaleganesh/signalr-stock-demo.git
cd signalr-stock-demo/frontend
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm start
```

Visit **[http://localhost:3000](http://localhost:3000)** to see the app live. You'll see stock prices updating every few seconds as the backend pushes changes.

---

## How It Works (Theory)

1. **SignalR** maintains a persistent connection between the client (this React app) and the backend.
2. A **SignalR Hub** on the backend broadcasts stock price updates.
3. The React app subscribes to these updates via `"ReceiveStockUpdate"`, updating its UI state dynamically.
4. This creates a live-updating ticker—with no page reloads and seamless performance.

---

## React Code at a Glance

**`src/StockDashboard.js`** — Core of the app:

```javascript
import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export default function StockDashboard() {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/stockHub")
      .withAutomaticReconnect()
      .build();

    connection.start().then(() => console.log("Connected"))
               .catch(err => console.error("Connection error:", err));

    connection.on("ReceiveStockUpdate", (symbol, price) => {
      setStocks(prev => ({ ...prev, [symbol]: price }));
    });

    return () => connection.stop();
  }, []);

  return (
    <div>
      <h2>📈 Live Stock Prices</h2>
      <ul>
        {Object.entries(stocks).map(([symbol, price]) => (
          <li key={symbol}>{symbol}: ${price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Available Scripts

In the `frontend` directory, you can run:

| Command         | What It Does                                                |
| --------------- | ----------------------------------------------------------- |
| `npm start`     | Runs the app in development mode with live reload           |
| `npm run build` | Builds the app for production into the `build/` folder      |
| `npm test`      | Launches test suite (if added later)                        |
| `npm run eject` | Remove Bulky configs from CRA—only if you need full control |

This is the standard Create React App setup ([GitHub][1]).

---

## Next Steps for Students

* **Explore the code**: See how SignalR is integrated and how React state is updated in real time.
* **Extend it**: Add more stocks, error handling, reconnection indicators, or initial data fetch.
* **Learn by changing**: Try formatting prices, sorting symbols, or adding CSS for styling experimentation.

---


[1]: https://github.com/kothawaleganesh/signalr-stock-demo "GitHub - kothawaleganesh/signalr-stock-demo"
