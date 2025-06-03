const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/send-invite', (req, res) => {
  const { name, profileUrl, message } = req.query;

  // Log or trigger automation here
  console.log('Sending invite to:', name, profileUrl);
  console.log('Message:', message);

  // TODO: Add your Puppeteer automation or headless browser call

  res.json({ status: 'success', sentTo: name });
});

// Health check
app.get('/', (req, res) => {
  res.send('Webhook is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
