from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from binance.client import Client
 
api_key = ''
api_secret = ''

client = Client(api_key, api_secret)

account_info = client.get_account()

app = FastAPI()
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

assets = ["SOLUSDT", "ETHUSDT"]
symbol = 'eth'

data = {
        'logo' : "logo",
        'short' : symbol,
        'full_name' : symbol,
        'coin_amout': float(0.2),
        'avg_cost' : 20,
        'todays_pnl_increase' : 2.4
        }

@app.get("/crypto")
async def get_coins():
    return data