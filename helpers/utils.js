import { signUpRequest } from "./apiCalls";
import { authorize, getConfirmationLinkFromEmail } from "../index";

export function generateNumberForNewUser() {
    let dt = new Date();
    const year = dt.getFullYear().toString().slice(-2);
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    const hh = dt.getHours().toString().padStart(2, '0');
    const mm = dt.getMinutes().toString().padStart(2, '0');
    const ss = dt.getSeconds().toString().padStart(2, '0');
    const millis = dt.getMilliseconds().toString().padStart(3, '0');
    const date = `${year}${month}${day}${hh}${mm}${ss}${millis}`
    return date;
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateNewUserData() {
    let userNumber = generateNumberForNewUser();
    return {
        email: `${process.env.EMAIL_PREFIX}${userNumber}${process.env.EMAIL_DOMAIN}`,
        name: `TestUser${userNumber}`,
        password: `QA_tester${userNumber}`,
    };
}

export async function createNewUserThroughApi(request) {
    const newUserData = await  generateNewUserData();
    console.log('Generated new user data:', newUserData);

    await signUpRequest(request, newUserData);

    return newUserData;
}

export async function retrieveUserEmailConfirmationLink(request, newUserData) {
    const auth = await authorize();

    return await getConfirmationLinkFromEmail(auth, newUserData.email);
}