const express = require('express');
const asyncRedis = require('async-redis');

const app = express();
const port = 3000;

app.use(express.json());

const redisClient = asyncRedis.createClient();
const REDIS_KEY = 'ids';

async function getIds() {
  const raw = await redisClient.get(REDIS_KEY);
  return raw ? JSON.parse(raw) : [];
}


async function saveIds(ids) {
  await redisClient.set(REDIS_KEY, JSON.stringify(ids));
}

//  POST 
app.post('/ids', async (req, res) => {
  const input = req.body;

  let itemsToAdd = [];

  if (Array.isArray(input)) {
    itemsToAdd = input.map(obj => obj.id).filter(Boolean);
  } else if (input && input.id) {
    itemsToAdd = [input.id];
  } else if (input && Array.isArray(input.ids)) {
    itemsToAdd = input.ids;
  } else {
    return res.status(400).json({ error: 'Invalid input. Provide { id }, { ids: [] }, or [{ id }] format.' });
  }

  const existing = await getIds();
  const newIds = [];

  for (const id of itemsToAdd) {
    if (!existing.includes(id)) {
      existing.push(id);
      newIds.push(id);
    }
  }

  await saveIds(existing);

  res.status(201).json({
    message: `${newIds.length} ID(s) added`,
    added: newIds,
    allIds: existing
  });
});

//  GET 
app.get('/ids', async (req, res) => {
  const ids = await getIds();
  res.json({ ids });
});

// DELETE 
app.delete('/ids', async (req, res) => {
  const { id, ids } = req.body;
  const toRemove = id ? [id] : ids;

  if (!toRemove || !Array.isArray(toRemove)) {
    return res.status(400).json({ error: 'Provide "id" or "ids" array' });
  }

  const current = await getIds();
  const remaining = current.filter(val => !toRemove.includes(val));
  const removed = current.filter(val => toRemove.includes(val));
  const notFound = toRemove.filter(val => !current.includes(val));

  await saveIds(remaining);

  res.json({ removed, notFound, allIds: remaining });
});

// PUT
app.put('/ids', async (req, res) => {
  const { oldId, newId } = req.body;

  if (!oldId || !newId) {
    return res.status(400).json({ error: 'Both oldId and newId are required' });
  }

  let ids = await getIds();

  if (!ids.includes(oldId)) {
    return res.status(404).json({ message: `ID "${oldId}" not found` });
  }

  if (ids.includes(newId)) {
    return res.status(400).json({ message: `ID "${newId}" already exists` });
  }

  ids = ids.map(id => (id === oldId ? newId : id));
  await saveIds(ids);

  res.json({
    message: `ID "${oldId}" updated to "${newId}"`,
    allIds: ids
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
