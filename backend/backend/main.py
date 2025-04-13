
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/signals")
def get_signals():
    def generate_chart_data():
        base = 27000
        return [
            {"time": (datetime.utcnow() - timedelta(minutes=5 * i)).strftime("%H:%M"), "price": base + random.randint(-1000, 1000)}
            for i in range(20)
        ][::-1]

    signals = [
        {
            "pair": "BTC/USDT",
            "strategy": "RSI + EMA",
            "action": random.choice(["buy", "sell"]),
            "chart": generate_chart_data()
        },
        {
            "pair": "ETH/USDT",
            "strategy": "MACD",
            "action": random.choice(["buy", "sell"]),
            "chart": generate_chart_data()
        }
    ]
    return signals
