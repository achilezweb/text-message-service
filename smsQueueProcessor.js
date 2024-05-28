const Redis = require('redis');
const redisClient = Redis.createClient({
    host: 'localhost',
    port: 6379
});

redisClient.connect();

async function enqueueMessage(message, phoneNumber) {
    await redisClient.rPush('messageQueue', JSON.stringify({ message, phoneNumber }));
    console.log('Message enqueued');
}

module.exports = { enqueueMessage };
