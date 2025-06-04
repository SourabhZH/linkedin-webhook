const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

const results = [];

// Function to read and parse CSV once
function loadCSVData(filePath) {
  return new Promise((resolve, reject) => {
    const temp = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        temp.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed.');
        resolve(temp);
      })
      .on('error', reject);
  });
}

// Endpoint to send invites from all rows
app.get('/send-all-invites', async (req, res) => {
  try {
    const data = await loadCSVData('https://docs.google.com/spreadsheets/d/14VGedqoL3fi82QT6l-HTBdzJYGq-NivK5qsHUbP0Nbk/edit?gid=0#gid=0'); // Update this path if needed

    for (const row of data) {
      const name = row.firstName;
      const company = row.company;
      const profileUrl = row.linkedinurl;

      const message = `Hello ${name}, Impressed with your work in ${company}. Would love to connect.`;

      // Simulate invite sending - replace with actual automation
      console.log(`Sending invite to ${name}`);
      console.log(`Profile: ${profileUrl}`);
      console.log(`Message: ${message}`);
      
      // TODO: Puppeteer or LinkedIn automation here
    }

    res.json({ status: 'success', processed: data.length });
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Webhook is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
