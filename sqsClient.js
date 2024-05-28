const AWS = require('aws-sdk');

// Initialize the AWS SDK for SQS
AWS.config.update({
    region: 'us-east-1' // Specify the AWS region where your SQS is hosted
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = "https://sqs.us-east-1.amazonaws.com/123456789012/YourQueueName";

/**
 * Sends a message to the configured SQS queue.
 * @param {Object} messageData - The data to be sent as the message body.
 * @returns {Promise} - A promise that resolves to the message sending result.
 */
function sendMessage(messageData) {
    const params = {
        MessageBody: JSON.stringify(messageData),
        QueueUrl: queueUrl,
    };

    return new Promise((resolve, reject) => {
        sqs.sendMessage(params, function(err, data) {
            if (err) {
                console.error("Error sending message to SQS:", err);
                reject(err);
            } else {
                console.log("Message sent to SQS, Message ID:", data.MessageId);
                resolve(data);
            }
        });
    });
}

module.exports = { sendMessage };
