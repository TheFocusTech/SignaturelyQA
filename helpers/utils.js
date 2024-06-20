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

    return `${year}${month}${day}${hh}${mm}${ss}${millis}`;
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateNewUserData(free = false, workflowVersion = null) {
    let userNumber = generateNumberForNewUser();
    process.env.NEW_USER_NUMBER = userNumber;
    let userData = {
        email: `${process.env.EMAIL_PREFIX}${userNumber}${process.env.EMAIL_DOMAIN}`,
        name: `TestUser${userNumber}`,
        password: `QA_tester${userNumber}`,
    };
    process.env.NEW_USER_EMAIL = userData.email;
    process.env.NEW_USER_NAME = userData.name;
    process.env.NEW_USER_PASSWORD = userData.password;

    if (free) {
        userData.free = true;
    }
    if (workflowVersion) {
        userData.workflowVersion = workflowVersion;
    }

    return userData;
}

export async function createNewUserThroughApi(request) {
    const newUserData = await  generateNewUserData();
    console.log(`Generated new user #${process.env.NEW_USER_NUMBER}`);

    await signUpRequest(request, newUserData);

    return newUserData;
}

export async function createNewFreeUserThroughApi(request) {
    const newFreeUserData = await  generateNewUserData(true, "a");
    console.log(`Generated new Free user #${process.env.NEW_USER_NUMBER}`);

    await signUpRequest(request, newFreeUserData);

    return newFreeUserData;
}

export async function retrieveUserEmailConfirmationLink(request, newUserData) {
    const auth = await authorize();

    return await getConfirmationLinkFromEmail(auth, newUserData.email);
}

export async function clickCanvas(page, canvasLocator, excludedAreas = []) {
    await canvasLocator.first().waitFor({ state: 'visible' });

    const canvasesCount = await canvasLocator.count();
    const largeCanvases = [];

    for (let i = 0; i < canvasesCount; i++) {
        const canvas = await canvasLocator.nth(i);
        const boundingBox = await canvas.boundingBox();

        if (boundingBox && boundingBox.width > 500) { 
            largeCanvases.push(canvas);
        }
    }

    if (largeCanvases.length === 0) {
        throw new Error("No suitable large canvas element found");
    }

    const randomIndex = Math.floor(Math.random() * largeCanvases.length);
    const chosenCanvas = largeCanvases[randomIndex];
    const boundingBox = await chosenCanvas.boundingBox();

    const getRandomPosition = (boundingBox, excludedAreas) => {
        let randomX, randomY;

        do {
            randomX = boundingBox.x + Math.random() * boundingBox.width;
            randomY = boundingBox.y + Math.random() * boundingBox.height;
        } while (
            excludedAreas.some(area =>
            randomX >= area.left && randomX <= area.left + area.width &&
            randomY >= area.top && randomY <= area.top + area.height
        )
    );

        return { x: randomX, y: randomY };
    };

    const clickPosition = getRandomPosition(boundingBox, excludedAreas);

    await chosenCanvas.click({
        position: { x: clickPosition.x - boundingBox.x, y: clickPosition.y - boundingBox.y },
        force: true
    });

    const newIndex = excludedAreas.length + 1;
    const elementAfterClick = page.locator('.fieldDropDown').nth(newIndex);

    if (await elementAfterClick.boundingBox()) {
        const elementBoundingRect = await elementAfterClick.boundingBox();
        const newExcludedArea = {
            left: elementBoundingRect.x - boundingBox.x,
            top: elementBoundingRect.y - boundingBox.y,
            width: elementBoundingRect.width,
            height: elementBoundingRect.height
        };
        excludedAreas.push(newExcludedArea);
    }

    return clickPosition;
}