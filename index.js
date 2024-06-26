const fs = require('fs').promises;
const { JSDOM } = require('jsdom');
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { delay } = require("./helpers/utils");

const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>} Authorized credentials if they exist, otherwise null.
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} gmailClient The authenticated OAuth2 client.
 * @return {Promise<void>} A Promise that resolves when the credentials are successfully saved.
 */
async function saveCredentials(gmailClient) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: gmailClient.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs. *
 */
async function authorize() {
    let gmailClient = await loadSavedCredentialsIfExist();
    if (gmailClient) {
        return gmailClient;
    }
    gmailClient = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
        additionalParameters: {
            access_type: 'offline'
        }
    });
    if (gmailClient.credentials) {
        await saveCredentials(gmailClient);
    }
    return gmailClient;
}

/**
 * Retrieves the confirmation link from an email using the Gmail API.
 * @param {object} auth The authentication object for the Gmail API.
 * @param {string} sender The email address of the sender.
 * @returns {Promise<string|null>} A Promise that resolves with the confirmation link if found, otherwise resolves with null.
 */
async function getConfirmationLinkFromEmail(auth, sender) {
    try {
        const gmail = google.gmail({ version: 'v1', auth })

        console.log('Waiting for email to arrive...');
        await delay(15000);
        console.log(`Fetching emails sent to ...${sender.slice(12)}`);

        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `to:${sender} subject:Signaturely Email Confirmation`,
            maxResults: 3,
        });

        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
            console.warn('No messages found.');
        }
        console.log(`Number of messages found: ${messages.length}`);
        console.log('Email received. Getting email body...');

        const newestMessage = messages[0];
        const res1 = await gmail.users.messages.get({
            userId: 'me',
            id: newestMessage.id,
        });

        const message = res1.data;
        const body = message.payload.body.data;
        if (!body) {
            console.warn('Message body not found.');
        }

        const mailBody = Buffer.from(body, "base64").toString();
        const regex = /https:\/\/staging\.d2twwklgqmrfet\.amplifyapp\.com\/[^"]+/g;
        const links = mailBody.match(regex);
        if (!links || links.length === 0) {
            console.warn('No confirmation link found in the email body.');
        }
        console.log(`Confirmation link retrieved: ${links[0].slice(0,40)}...`);

        return links[0];
    } catch (error) {
        console.error('Error occurred while getting confirmation link:', error);
        return null;
    }
}

/**
 * Retrieves the confirmation link from an email using the Gmail API.
 * @param {object} auth The authentication object for the Gmail API.
 * @param {string} sender The email address of the sender.
 * @returns {Promise<string|null>} A Promise that resolves with the confirmation link if found, otherwise resolves with null.
 */
async function getConfirmCodeFromEmail(auth, sender) {
    try {
        const gmail = google.gmail({ version: 'v1', auth })
        console.log('Waiting for email to arrive...');
        await delay(10000);
        console.log(`Fetching emails sent to ...${sender.slice(12)}`);

        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `to:${sender} subject:Signaturely Code Confirmation`,
            maxResults: 3,
        });

        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
            console.warn('No messages found.');
        }

        const newestMessage = messages[0];
        const res1 = await gmail.users.messages.get({
            userId: 'me',
            id: newestMessage.id,
        });

        const message = res1.data;
        const body = message.payload.body.data;
        if (!body) {
            console.warn('Message body not found.');
        }

        const mailBody = Buffer.from(body, "base64").toString();
        const confirmCodeRegex = /Confirm Code:\s*([A-Za-z0-9]+)/;
        const confirmCode = mailBody.match(confirmCodeRegex);

        if (confirmCode) {
            console.log('Confirmation Code:', confirmCode[1]);
        } else {
            console.warn('Confirmation Code not found');
        }

        return confirmCode[1];

    } catch (error) {
        console.error('Error occurred while getting confirmation link:', error);
        return null;
    }
}

/**
 * Checks if an email message is received from a specific sender with a given subject.
 *
 * @param {object} auth - The OAuth2 client used for authentication.
 * @param {string} senderName - The name of the sender.
 * @param {string} receiverEmail - The email address of the receiver.
 * @param {string} subject - The subject of the email to search for.
 * @returns {Promise<string|null>} The extracted text from the email, or null if not found.
 */
async function checkEmailMessageReceived(auth, senderName, receiverEmail, subject) {
    try {
        const gmail = google.gmail({version: 'v1', auth})

        console.log('Waiting for email to arrive...');
        await delay(10000);
        console.log(`Fetching emails sent from ...${senderName}`);

        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `from:${senderName} to:${receiverEmail} subject:(${subject})`
        });

        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
            console.warn('No messages found.');
        }

        const newestMessage = messages[0];
        const res1 = await gmail.users.messages.get({
            userId: 'me',
            id: newestMessage.id,
        });

        const message = res1.data;
        const body = message.payload.body.data;
        if (!body) {
            console.warn('Message body not found.');
        }

        const mailBody = Buffer.from(body, "base64").toString();
        const dom = new JSDOM(mailBody);
        const document = dom.window.document;
        const spanElement = document.querySelector('span');
        if (spanElement) {
            let text = spanElement.textContent;
            text = text.replace(/\s+/g, ' ').trim();
            console.log(`Extracted text: ${text.slice(0, text.indexOf('(')) + text.slice(text.indexOf(')') + 1).trim()}`);
            return text;
        } else {
            console.warn('Span element not found.');
        }
    } catch (error) {
        console.error('Error occurred while extracting username:', error);
    }
}

module.exports = {
    checkEmailMessageReceived,
    getConfirmCodeFromEmail,
    getConfirmationLinkFromEmail,
    authorize
};