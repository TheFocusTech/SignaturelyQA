import { createNewClient } from '../dbClient.js';
import { newUserEmail } from './apiUtilsForNewUser.js';

export async function databaseConfirmNewUserEmail() {
    const client = createNewClient();
    await client.connect();
    const query = `UPDATE public.users  
                    SET "isEmailConfirmed" = true
                    WHERE email = '${newUserEmail}'`;
    try {
        await client.query(query);
        console.log("Email has been successfully confirmed");
    } catch (err) {
        console.error(err.message);
        throw err;
    } finally {
        await client.end();
    }
}
