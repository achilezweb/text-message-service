const { sendSMS } = require('./smsDispatcher');

const RATE_LIMIT = 45; // messages per second
let lastTimestamp = Date.now();
let messageCount = 0;

function manageRateLimit(messageData) {
    const currentTime = Date.now();
    if (messageCount >= RATE_LIMIT && currentTime - lastTimestamp < 1000) {
        setTimeout(() => manageRateLimit(messageData), 1000 - (currentTime - lastTimestamp));
    } else {
        if (currentTime - lastTimestamp >= 1000) {
            lastTimestamp = currentTime;
            messageCount = 0;
        }
        messageCount++;
        sendSMS(messageData);
    }
}

module.exports = { manageRateLimit };
