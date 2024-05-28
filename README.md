# Text Message Service

### Overview

This Text Message Service is a scalable, modular system designed for queueing and sending SMS messages with rate limiting feature. The system leverages Node.js, Express.js, Redis, and AWS SQS to manage message dispatch efficiently. Each component of the system is isolated to ensure clean separation of concerns and ease of maintenance.

### Project Structure

```bash
/text-message-service
|-- app.js                        # Main Express server and API endpoints
|-- messageSender.js              # Manages message sending from the queue
|-- smsDispatcher.js              # Handles the actual SMS sending logic
|-- rateLimitedSmsSender.js       # Manages sending with a rate limit of 45 segments per second to avoid surpassing limits
|-- smsQueueProcessor.js          # Handles message queuing in Redis
|-- sqsClient.js                  # Configures the AWS SDK and handles sending messages to SQS
|-- serverless.yml                # Configures serverless for automated deployment
|-- smsServicePolicy.json         # Policy to allow specific services like Lambda to interact with queue
```
### Requirements

- Node.js
- npm (Node Package Manager)
- Serverless Framework installed globally (`npm install -g serverless`)
- AWS account with access to AWS SQS
- Redis server

### Setup Instructions

1. Install Node.js and npm

    Download and install Node.js from [nodejs.org](nodejs.org). npm is included in the installation.
2. Setup AWS SQS

    - Log into the [AWS Management Console](https://aws.amazon.com/free).
    - Navigate to the [SQS service](https://aws.amazon.com/sqs/) and create a new queue.
    - Note down the queue URL for configuration in your application.
3. Install `redis` 

    Follow the Redis Quick Start guide to install Redis on your platform: [Redis Quick Start](https://redis.io/topics/quickstart).
4. Clone the Repository

    Clone this repository to your local machine:
    ```bash
    git clone https://github.com/achilezweb/text-message-service.git
    cd text-message-service 
    ```
5. Install Dependencies

    Run the following command in the project directory to install the necessary dependencies:
    ```bash
    npm install
    ```
6. Configure Environment Variables `.env` file

    Set up necessary environment variables or a `.env` file to store configurations such as AWS credentials and SQS/ Redis settings.
### Serverless Deployment

1. Configure serverless.yml
   
    Setup your `serverless.yml` file to manage deployments on AWS Lambda and API Gateway. Here's a basic configuration example:
    ```bash
    nnn
    ```
2. Deploy Using Serverless

    Once your `serverless.yml` is configured, deploy your application to AWS:
    ```bash
    serverless deploy
    ```
### Usage

1. Start the Express Server

    Run the following command to start the server:
    ```bash
    node app.js
    ```
    The server will listen for incoming HTTP POST requests to enqueue messages.
2. Enqueue Messages

    Send a POST request to `http://localhost:3000/send` with a JSON payload containing the `message` and `phoneNumber`:
    ```bash
    curl -X POST http://localhost:3000/send -H "Content-Type: application/json" -d '{"message": "Hello World", "phoneNumber": "+1234567890"}'
    ```
3. Start the Message Sender

    Run the message sender script in a separate terminal:
    ```bash
    node messageSender.js
    ```
### Modules Description

- `app.js`: Sets up the Express server and defines endpoints for queueing SMS messages.
- `messageSender.js`: Processes messages from the queue and manages sending operations using other modules.
- `smsDispatcher.js`: Simulates sending an SMS and could be extended to integrate with an actual SMS gateway.
- `rateLimitedSmsSender.js`: Ensures that the message sending rate does not exceed set limits.
- `smsQueueProcessor.js`: Contains functions to add messages to the Redis queue.
- `sqsClient.js`: Handles configuration of the AWS SDK for SQS and sending messages to the SQS queue.

### Error Handling 

#### Setup Logging Framework and Monitoring

- Winston: A versatile logging library for Node.js that supports multiple transports.
- Morgan: Useful for logging HTTP requests in web applications.
- Use basic console logging for immediate feedback during development
- AWS CloudWatch can monitor AWS resources and applications. Set up logging and metrics for both AWS Lambda and Amazon EC2 instances running Node.js applications.
#### Application-Level Error Handling

- Try-Catch Blocks: Ensure all critical operations, especially I/O operations, are wrapped in try-catch blocks to handle exceptions gracefully.
- Error Logging: Use libraries like winston or morgan to log errors to various outputs (console, file, external monitoring services).
  
#### Module-Specific Error Handling

- `smsQueueProcessor.js`: Handles errors in message queuing. If Redis is down, it retries the operation with exponential backoff.
- `rateLimitedSmsSender.js`: Manages rate limiting errors. If limits are hit, it queues the request and tries again later.
- `sqsClient.js`: Catches and logs errors from AWS SQS operations. In case of network issues, it implements retry logic.
  
#### AWS Lambda Error Handling

- Timeouts and Configuration: Ensure that Lambda functions have appropriate timeout settings and memory allocation based on load testing.
- Dead Letter Queues (DLQ): Configure DLQs in AWS Lambda to capture and sideline unprocessed events for later investigation.

#### Monitoring and Alerts

- AWS CloudWatch: Use CloudWatch for monitoring function executions and setting alarms on error metrics.
- Third-party Tools: Consider integrating tools like Datadog or New Relic for advanced monitoring and real-time alerting.

#### Error Handling in sqsClient.js

```bash
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

async function sendMessage(queueUrl, messageBody) {
    const params = {
        MessageBody: JSON.stringify(messageBody),
        QueueUrl: queueUrl,
    };

    try {
        const data = await sqs.sendMessage(params).promise();
        console.log(`Message sent, ID: ${data.MessageId}`);
    } catch (error) {
        console.error('Failed to send message:', error);
        // Implement retry logic here
        handleSQSError(error);
    }
}

function handleSQSError(error) {
    if (error.code === 'Throttling') {
        // Backoff and retry logic
    } else {
        // Log and alert
    }
}

```

### Contributing

Contributions to this project are welcome. Please fork the repository, make your changes, and submit a pull request.

### Demo
Coming soon

