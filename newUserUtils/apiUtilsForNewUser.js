import { generateNumberForNewUser } from '../helpers/utils.js';

export let newUserEmail;
export let newUserPassword;

export async function api_user_sign_up(request) {
    const newUserNumber = generateNumberForNewUser();

    const NEW_USER_CREDENTIALS = {
        email: `${process.env.EMAIL_PREFIX}${newUserNumber}${process.env.EMAIL_DOMAIN}`,
        free: true,
        name: `TestUser${newUserNumber}`,
        password: `QA_tester${newUserNumber}`,
        workflowVersion: "a"
    };

    let response;
    let attempt = 0;
    let maxRetries = 3;

    while (attempt < maxRetries) {
        attempt++;
        response = await request.post(`${process.env.API_URL}/auth/sign_up`, { data: NEW_USER_CREDENTIALS });

        if (response.ok()) {
            console.log(`Free User has been successfully created: #${newUserNumber}`);
            newUserEmail = NEW_USER_CREDENTIALS.email;
            newUserPassword = NEW_USER_CREDENTIALS.password;
            break;
        }

        if (attempt === maxRetries) {
            throw new Error(`Failed to proceed User sign up after ${maxRetries} attempts: ${response.status()}`);
        }
        console.log(`Attempt ${attempt} failed: ${response.status()} - ${await response.text()}. Retrying...`);
    }
}
