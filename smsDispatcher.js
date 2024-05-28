function sendSMS({ message, phoneNumber }) {
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    // Here you would integrate with an actual SMS API
}

module.exports = { sendSMS };
