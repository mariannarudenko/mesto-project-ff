const corsAnywhere = require('cors-anywhere');
const port = 3000;

corsAnywhere.createServer({
  originWhitelist: [], 
  requireHeader: [], 
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
  console.log(`CORS Proxy server running on http://localhost:${port}`);
});