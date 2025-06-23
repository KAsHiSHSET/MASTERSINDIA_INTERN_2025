// app.js
const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = 3000;

// Redis client
const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
(async () => {
  await redisClient.connect();

  // Route with Redis caching
  app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    // Try getting from Redis first
    const cachedUser = await redisClient.get(userId);

    if (cachedUser) {
      console.log('Cache hit');
      return res.json({ source: 'cache', data: JSON.parse(cachedUser) });
    }

    // Simulate DB/API fetch
    console.log('Cache miss');
    const user = { id: userId, name: 'Kashish', role: 'developer' };

    // Store in Redis for 60 seconds
    await redisClient.setEx(userId, 60, JSON.stringify(user));

    res.json({ source: 'API', data: user });
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
