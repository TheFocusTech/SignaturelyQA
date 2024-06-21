import { generateNewUserData } from '../helpers/utils.js';
import { API_URL_END_POINTS } from '../apiData.js'

export async function api_user_sign_up(request) {

    const newUserCredentials = await generateNewUserData(true, "a");

    let response;
    let attempt = 0;
    let maxRetries = 3;

    while (attempt < maxRetries) {
        attempt++;
        response = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signUpEndPoint}`, { data: newUserCredentials });

        if (response.ok()) {
            console.log(`Free User has been successfully created: #${process.env.NEW_USER_NUMBER}`);
            break;
        }

        if (attempt === maxRetries) {
            throw new Error(`Failed to proceed User sign up after ${maxRetries} attempts: ${response.status()}`);
        }
        console.log(`Attempt ${attempt} failed: ${response.status()} - ${await response.text()}. Retrying...`);
    }
}
