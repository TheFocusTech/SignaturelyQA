import { createNewClient } from '../dbClient.js';
import { step } from 'allure-js-commons';

export async function dbEditDocumentStatus(status, documentId) {
  await step('DataBase query: Change status of the document to "expired"', async () => {
    if (!documentId) {
      console.warn(`Invalid documentId: ${documentId}`);
    }
    const client = createNewClient();
    await client.connect();
    const query = `UPDATE public.documents  
                    SET "status" = '${status}'
                    WHERE "id" = '${documentId}'`;
    try {
      await client.query(query);
      console.log(`The status of document ${documentId} has been successfully changed to "${status}".`);
    } catch (err) {
      console.error(err.message);
      throw err;
    } finally {
      await client.end();
    }
  });
}
