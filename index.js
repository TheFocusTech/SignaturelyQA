const fs = require('fs').promises;
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
 * @param {OAuth2Client} client The authenticated OAuth2 client.
 * @return {Promise<void>} A Promise that resolves when the credentials are successfully saved.
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs. *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
        additionalParameters: {
            access_type: 'offline'
        }
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
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
        console.log('Fetching emails sent to:', sender);

        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `to:${sender} subject:Signaturely Email Confirmation`,
            maxResults: 3,
        });

        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
            console.log('No messages found.');
        }

        const newestMessage = messages[0];
        const res1 = await gmail.users.messages.get({
            userId: 'me',
            id: newestMessage.id,
        });

        const message = res1.data;
        const body = message.payload.body.data;
        if (!body) {
            console.log('Message body not found.');
        }

        const mailBody = Buffer.from(body, "base64").toString();
        const regex = /https:\/\/staging\.d2twwklgqmrfet\.amplifyapp\.com\/[^"]+/g;
        const links = mailBody.match(regex);
        if (!links || links.length === 0) {
            console.log('No confirmation link found in the email body.');
        }
        console.log('Confirmation link retrieved:', links[0]);

        return links[0];
    } catch (error) {
        console.error('Error occurred while getting confirmation link:', error);
        return null;
    }
}

module.exports = {
    getConfirmationLinkFromEmail,
    authorize
};