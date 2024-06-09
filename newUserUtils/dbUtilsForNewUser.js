import { client } from '../dbClient.js';
import { NEW_USER_CREDENTIALS } from "./apiUtilsForNewUser";

export async function databaseConfirmNewUserEmail() {
    await client.connect();
    const query = `UPDATE public.users  
                    SET "isEmailConfirmed" = true
                    WHERE email = '${NEW_USER_CREDENTIALS.email}'`;
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
