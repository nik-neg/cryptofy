// jest.setup.ts

// Set environment variables for testing
process.env.PORT = '3000';
process.env.HOST = 'localhost';
process.env.API_QUOTE_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
process.env.API_KEY = 'your-api-key';

``;
