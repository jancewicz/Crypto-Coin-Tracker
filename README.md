# Cryptocurrency Coin Tracker

## YouTube video presentation of project: 


[![Crypto Coin Tracker](https://img.youtube.com/vi/rsiTFfuzQoQ/0.jpg)](https://youtu.be/rsiTFfuzQoQ)


## Main goal of the project:

Hello every one! The main goal of my project was to work with Binance API and display fetched data about chosen coins and how the value is changing in different periods, as well as get better understanding of asyn functions and await method of javascript language. I used Chart.JS which is free library that helps to display data in chart.



### HTML / CSS

Layout of the page is done using flexbox and simple CSS.


### Javascript

Binance API I used returns the array of 500 objects that represents last 500 days with different values like close candle stick price, highest 24h price or the number of trades. From this data we can adjust the variables and append them to HTML for user to be displayed.

The Chart in the main sector of the page is dynamically created using javascript. In documentation of Chart.JS library we are informed that every time we want to print new chart we have to destroy latest one in advance, and then we can create new one. 


Thank you for your time! 