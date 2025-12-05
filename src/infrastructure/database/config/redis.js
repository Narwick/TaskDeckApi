const { createClient } = require('redis');

const redisClient = async () => {
  const alth = {
    url: process.env.REDIS_URL,
  };
  const client = createClient(alth);
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  return client;
};

module.exports = { redisClient };
