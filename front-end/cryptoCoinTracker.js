const timeData = [1625097600000, 1625184000000, 1625270400000, 1625356800000, 1625443200000];
const cryptoValues = [40000, 42000, 38000, 45000, 43000];

const formattedTimeData = timeData.map(time => new Date(time).toLocaleDateString());

const ctx = document.getElementById('my-chart').getContext('2d');

const cryptoChart = new Chart(ctx, {
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


function getCoinAPI() {
    let coinData;
    fetch('http://127.0.0.1:8000/crypto')
        .then(response => response.json())
        .then(data => {
            coinData = data;
            console.log(coinData);
        })
        .catch(error => {
            console.log(error)
        });

    coinData.forEach((element) => {
        // document.getElementById("crypto-logo").innerHTML = <img src="vsfsfs.jpg"></img>
        document.getElementById("short-name").innerText = element.short;
        document.getElementById("coin-name").innerText = element.full_name;
        document.getElementById("coin-amout").innerText = element.coin_amout;
        document.getElementById("average-buy-cost").innerText = element.avg_cost;
        document.getElementById("percent-pnl-increase").innerText = element.todays_pnl_increase;
    })

}
getCoinAPI();