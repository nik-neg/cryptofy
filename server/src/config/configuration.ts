export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api_key: process.env.API_KEY || 'api_key',
});
