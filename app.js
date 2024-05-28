const express = require('express');
const bodyParser = require('body-parser');
const { enqueueMessage } = require('./smsQueueProcessor');

const app = express();
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { message, phoneNumber } = req.body;
    enqueueMessage(message, phoneNumber);
    res.send('Message queued for sending');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
