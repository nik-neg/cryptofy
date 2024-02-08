export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    api_key: process.env.API_KEY || 'api_key',
    host: process.env.HOST || 'localhost',
});