console.log((365 / 2).toFixed())

let time;
let currentCoin = "BTC"
let globalCoinData;

const coinSymbolsMap = new Map();
coinSymbolsMap.set('BTC', "Bitcoin");
coinSymbolsMap.set('ETH', "Ethereum");
coinSymbolsMap.set('SOL', "Solana");
coinSymbolsMap.set('BNB', "BNB");

let timeData = [];
let cryptoValues = [];
let timeFrame = "year";

function adjustTimeData(data) {
    /// iter over array as binance API gives array of 500 objects each representing one day
    switch (timeFrame) {
        case "year":
            for (let i = 0; i < 365; i++) {
                const dateObject = new Date(data[135 + i - 1].date);
                timeData.push(dateObject.getTime());
                cryptoValues.push(data[135 + i - 1].close)
            }
            printChart();
            timeData = [];
            cryptoValues = [];
            break;
        case "half year":
            for (let i = 0; i < 183; i++) {
                const dateObject = new Date(data[317 + i - 1].date);
                timeData.push(dateObject.getTime());
                cryptoValues.push(data[317 + i - 1].close)
            }
            printChart();
            timeData = [];
            cryptoValues = [];
            break;
        case "one month":
            for (let i = 0; i < 31; i++) {
                const dateObject = new Date(data[469 + i - 1].date);
                timeData.push(dateObject.getTime());
                cryptoValues.push(data[469 + i - 1].close);
            }
            printChart();
            timeData = [];
            cryptoValues = [];
            break;
    }

}

const selectCoinDropdown = () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector(".select");
        const caret = dropdown.querySelector(".caret");
        const menu = dropdown.querySelector(".menu");
        const options = dropdown.querySelectorAll(".menu li");
        const selected = dropdown.querySelector(".selected");

        select.addEventListener("click", () => {
            select.classList.toggle("select-clicked");
            caret.classList.toggle("caret-rotate");
            menu.classList.toggle("menu-open");
        });

        options.forEach(option => {
            option.addEventListener("click", () => {
                selected.innerText = option.innerText;
                select.classList.remove("select-clicked");
                caret.classList.remove("caret-rotate");
                menu.classList.remove("menu-open");
                options.forEach(option => {
                    option.classList.remove("active");
                });
                option.classList.add("active");
            });
        });
    });
};

async function getCoinData(symbol) {
    globalCoinData = await fetchPriceData(symbol);
    updateUserDisplay(globalCoinData);
    updateDetails(globalCoinData);
    appendCoinNameToHTML();
    adjustTimeData(globalCoinData)
}

async function fetchPriceData(symbol) {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d`);
    const data = await response.json();

    return data.map(element => ({
        date: new Date(element[0]),
        open: parseFloat(element[1]),
        high: parseFloat(element[2]),
        low: parseFloat(element[3]),
        close: parseFloat(element[4]),
        volume: parseFloat(element[5]),
        closeTime: new Date(element[6]),
        quoteAssetVolume: parseFloat(element[7]),
        numberOfTrades: parseInt(element[8]),
        takerBuyBaseAssetVolume: parseFloat(element[9]),
        takerBuyQuoteAssetVolume: parseFloat(element[10]),
        ignore: parseFloat(element[11])
    }));
}

function updateUserDisplay(data) {
    let currentCoinPrice = data[data.length - 1].close;
    let coinPriceDayBefore = data[data.length - 2].close;

    let priceDifference = currentCoinPrice - coinPriceDayBefore;
    let countClosePercentage = (100 * currentCoinPrice) / coinPriceDayBefore - 100;


    document.getElementById("current-price-value").innerText = `${currentCoinPrice} $`;

    if (priceDifference > 0) {
        document.getElementById("price-change").innerText = `+${priceDifference.toFixed(2)} $`;
        document.getElementById("percent-change").innerText = `(+${countClosePercentage.toFixed(2)}%)`;
        document.getElementById("percent-change").style.cssText = "color: #19be1b;"
        document.getElementById("price-change").style.cssText = "color: #19be1b;"
    } else {
        document.getElementById("price-change").innerText = `${priceDifference.toFixed(2)} $`;
        document.getElementById("percent-change").innerText = `(${countClosePercentage.toFixed(2)}%)`;
        document.getElementById("percent-change").style.cssText = "color: #e00b0b;"
        document.getElementById("price-change").style.cssText = "color: #e00b0b;"
    }
}

function updateDetails(data) {
    let dailyVolume = data[data.length - 1].volume;
    document.getElementById("market-cap-volume").innerText = `${dailyVolume.toFixed(2)}`;
    let low = data[data.length - 1].low;
    document.getElementById("lowest-coin-price").innerText = `${low.toFixed(2)}`;
    let high = data[data.length - 1].high;
    document.getElementById("highest-coin-price").innerText = `${high.toFixed(2)}`;
}


function appendCoinNameToHTML() {
    document.getElementById("coin-name").innerText = coinSymbolsMap.get(currentCoin);
    document.getElementById("short-name").innerText = currentCoin;
}

function appendCoinLogoToHTML(coinName) {
    const parentDiv = document.getElementById("crypto-logo");
    const img = document.createElement("img");
    img.src = `./images/${coinName} logo.png`
    img.id = "png-image";
    parentDiv.appendChild(img);

}

function deleteExistingLogo() {
    const parentDiv = document.getElementById("crypto-logo");
    const coinLogoDiv = document.getElementById("png-image");
    coinLogoDiv.remove();
};

const ethereumButton = document.getElementById("ethereum");
ethereumButton.addEventListener("click", () => {
    currentCoin = "ETH";
    getCoinData(`${currentCoin}USDT`);
    deleteExistingLogo();
    appendCoinLogoToHTML("ethereum");
});

const bitcoinButton = document.getElementById("bitcoin");
bitcoinButton.addEventListener("click", () => {
    currentCoin = "BTC";
    getCoinData(`${currentCoin}USDT`);
    deleteExistingLogo();
    appendCoinLogoToHTML("bitcoin");
});

const solanaButton = document.getElementById("solana");
solanaButton.addEventListener("click", () => {
    currentCoin = "SOL";
    getCoinData(`${currentCoin}USDT`);
    deleteExistingLogo();
    appendCoinLogoToHTML("solana");
});

const bnbButton = document.getElementById("bnb");
bnbButton.addEventListener("click", () => {
    currentCoin = "BNB";
    getCoinData(`${currentCoin}USDT`);
    deleteExistingLogo();
    appendCoinLogoToHTML("bnb");
});

const oneYearButton = document.getElementById("year");
oneYearButton.addEventListener("click", () => {
    timeFrame = "year";
    getCoinData(`${currentCoin}USDT`);
});

const sixMonthsButton = document.getElementById("half-year");
sixMonthsButton.addEventListener("click", () => {
    timeFrame = "half year";
    getCoinData(`${currentCoin}USDT`);

});
const oneMonth = document.getElementById("one-month");
oneMonth.addEventListener("click", () => {
    timeFrame = "one month";
    getCoinData(`${currentCoin}USDT`);

});


getCoinData(`${currentCoin}USDT`);
selectCoinDropdown();
// chart.JS demands to destroy existing chart before creating a new one
let cryptoChart = null;
function printChart() {
    if (cryptoChart) {
        cryptoChart.destroy();
    }

    const formattedTimeData = timeData.map(time => new Date(time).toLocaleDateString());

    const ctx = document.getElementById('my-chart').getContext('2d');

    cryptoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: formattedTimeData,
            datasets: [{
                label: 'Cryptocurrency Value',
                data: cryptoValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}