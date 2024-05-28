const Redis = require('redis');
const redisClient = Redis.createClient({
    host: 'localhost',
    port: 6379
});
const { manageRateLimit } = require('./rateLimitedSmsSender');

redisClient.connect();

async function startSendingMessages() {
    while (true) {
        const messageData = await redisClient.lPop('messageQueue');
        if (messageData) {
            manageRateLimit(JSON.parse(messageData));
        } else {
            console.log('No messages to send, waiting...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

startSendingMessages();
