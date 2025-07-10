const { createClient } = require('redis');

async function testRedis() {
  const client = createClient();

  client.on('error', (err) => console.error('❌ Redis Error:', err));

  await client.connect();

  await client.set('testKey', 'Hello from Redis v4!');
  const value = await client.get('testKey');

  console.log('✅ Redis Value:', value);

  await client.quit();
}

testRedis();
