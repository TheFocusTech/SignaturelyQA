import { createNewClient } from '../dbClient.js';
import { step } from "allure-js-commons";

export async function databaseConfirmNewUserEmail() {
    await step(`Free User Email Confirmation via Database`, async () => {
        const client = createNewClient();
        await client.connect();
        const query = `UPDATE public.users  
                    SET "isEmailConfirmed" = true
                    WHERE email = '${process.env.NEW_USER_EMAIL}'`;
        try {
            await client.query(query);
            console.log("Email has been successfully confirmed");
        } catch (err) {
            console.error(err.message);
            throw err;
        } finally {
            await client.end();
        }
    });
}