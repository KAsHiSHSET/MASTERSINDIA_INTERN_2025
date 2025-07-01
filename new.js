
// NEW.JS

const express = require('express');
const asyncRedis = require('async-redis');
const cron = require('node-cron');

const app = express();
const port = 3000;

app.use(express.json());

// Redis client
const redisClient = asyncRedis.createClient();

// In-memory ID cache
let idCache = [];

// Initialize Redis with a, b, d (run once)
(async () => {
  await redisClient.del('ids'); // Clear existing list
  await redisClient.rpush('ids', 'a', 'b', 'd'); // Set initial list
  console.log('✅ Redis initialized with [a, b, d]');
  await refreshIdCache(); // Refresh immediately on startup
})();

//  Function to refresh in-memory cache from Redis
async function refreshIdCache() {
  try {
    const ids = await redisClient.lrange('ids', 0, -1);
    idCache = ids;
    console.log('🔄 ID cache refreshed from Redis:', idCache);
  } catch (error) {
    console.error('❌ Failed to refresh ID cache:', error);
  }
}

//  Cron job , refreshes in 1 min
cron.schedule('*/1 * * * *', refreshIdCache);

// API to add a new ID to Redis
app.post('/add-id', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const existing = await redisClient.lrange('ids', 0, -1);
    if (!existing.includes(id)) {
      await redisClient.rpush('ids', id);
      return res.status(201).json({ message: 'ID added', id });
    } else {
      return res.status(409).json({ message: 'ID already exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add ID' });
  }
});

//  API to get current list
app.get('/ids', (req, res) => {
  res.json({ ids: idCache });
});

//  server start
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
