# cryptofy

Welcome to cryptofy!

Please create a `.env` file in the root directory with the following content:

```
PORT=3000
API_QUOTE_URL=https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
API_KEY=<YOUR_KEY>
```

To start the server, run the following commands:

```
docker build -t cryptofy .

docker run -p 3000:3000 cryptofy
```

To run the tests, please first add
the API_KEY to the jest setup

```
process.env.API_KEY = 'your-api-key';
```
install the dependencies via
    
```
npm i
```
and then run the following commands:

```
npm test
```