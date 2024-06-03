import {test, expect} from "@playwright/test"
import path from "node:path"

test.describe('createDocument', ()=> {

    test.beforeEach (async({page}) => {
        await page.goto(process.env.URL)
        await page.getByPlaceholder('username@gmail.com').fill(process.env.USER_EMAIL)
        await page.getByPlaceholder('Your password').fill(process.env.USER_PASSWORD)
        await page.getByRole('button', {name:'Login'}).click()
    })

    test ('Sign and Send for signature', async({page}) => {
        test.setTimeout(120 * 1000)

        //Upload file
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.getByRole('button', {name:'Upload File'}).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, '../testDocuments/todoList.xlsx'));
        // const dropzone = page.locator('.upload__dropzone--success');  //await page.waitForSelector('.upload__dropzone--success')
        // await dropzone.waitFor();

        const prepareDocumentButton = page.locator('.button--primary').nth(1); 
        await prepareDocumentButton.waitFor('disabled');
        // await page.waitForFunction((button) => button.disabled, prepareDocumentButton);
        //await page.waitForLoadState('disabled')
        //await prepareDocumentButton.waitFor({ state: 'disabled' });
        //('.button--primary:has("background-color", "rgb(0, 163, 250)")');
        // await page.waitForEvent()
        // await waitForEvent(expect(prepareDocumentButton).toHaveCSS('background-color', 'rgb(134, 152, 165)'));
        // await prepareDocumentButton.getAttribute('background-color', 'rgb(134, 152, 165)').waitFor();

        await page.getByRole('button', {name:'Prepare Document'}).click();
        
        
        //background-color has 'rgb(134, 152, 165)'

        //Sign & Send for Signature  https://staging.d2twwklgqmrfet.amplifyapp.com/sign
        //await page.getByText('Sign & Send for Signature', { exact: true }).click();
        const signAndSendForSignature = page.locator('//label[text()="Sign & Send for Signature"]');
        await signAndSendForSignature.waitFor(); //await page.waitForSelector('//label[text()="Sign & Send for Signature"]')
        await signAndSendForSignature.click();

        //Add Other Signers
        //addSignerButton
        await page.locator('.addButton__wrapper').first().click()
        await page.locator('input[placeholder="Name"]').first().fill('MM2_tester')
        await page.locator('input[placeholder="Email"]').first().fill('sign.js.test+34@gmail.com')
        await page.getByRole('button', {name:'Continue'}).click()

        //Sign
        // await page.getByText('Sign', {exact: true}).click() //doesn't work
        const signButton = page.locator('.interactModal__fieldBar-fieldItem').first();
        await signButton.waitFor();
        await signButton.click();

        //Move mouse on the canvas
        await page.mouse.move(125, 145);
        const canvas = page.locator('.react-pdf__Page__canvas').first();
        await canvas.click();
        await page.waitForTimeout(5*1000);

        await page.mouse.move(125, 245);
        await canvas.click();
        await page.waitForTimeout(5*1000);

        //Assigned To
        await page.locator('.uiSelect__select').nth(1).click();
        //uiSelect__select-row
        await page.getByText('Me (Now)').click();


        //Choose Signature
        // await page.getByRole('listitem', {name: 'Typed'}).waitFor();
        await page.locator('.settingsSignature__item-inner').nth(1).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Sign Now' }).click();
        //await page.getByText('Sign Now').click();
        await page.waitForTimeout(5000);

        //Save
        //await page.getByText('Save');
        await page.getByRole('button', {name: 'Save'}).click();
        await page.waitForTimeout(5000);

        //Final step
        // const finalStep = page.locator('.wizardSignForm__finishTitle');
        // await finalStep.waitFor();
       // await page.getByText('Final Step').waitFor();
        //.wizardSignForm__finishTitle
        // const finalStep = page.locator('.form__input-wrapper');
        // await finalStep.waitFor();

        await page.waitForSelector('.wizardSignForm__finishTitle');
        await page.getByPlaceholder('Enter the title').fill('');
        await page.getByPlaceholder('Enter the title').fill('XuuuuDocument for sign');
        await page.getByRole('button', {name: 'Sign Document and Send for Signature'}).click();

        //Wait 'The document is being processed'
        await page.getByText('Save a copy of your document').waitFor();
        await page.getByRole('button', {name: 'Back to Documents  '}).click();

        await expect (page.locator('.documents__documentStatus--awaiting').nth(0)).toHaveText('awaiting');
        //getByText('Document for signawaitingJun').first()

    })
})