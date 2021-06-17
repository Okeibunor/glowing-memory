const Mailgun = require('mailgun-js');

const sendThankYouEmail = async ({ email }) => {
    return new Promise((resolve, reject) => {
        console.log('Sending the email');
        const { MG_API_KEY: apiKey, MG_DOMAIN: domain } = process.env;
        const mailgun = Mailgun({
            apiKey,
            domain
        });

        const mailData = {
            from: 'favourokeibunor@gmail.com',
            to: email,
            subject: 'Thank you for your interest',
            text: "I'll come back to you asap!"
        };

        mailgun.messages().send(mailData, err => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.handler = async event => {
    console.log(event)
    try {
        const data = JSON.parse(event.body);

        await sendThankYouEmail(data);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Let's become serverless conductors!!!"
            })
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: e.mssage
        };
    }
};