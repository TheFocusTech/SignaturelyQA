import {API_URL_END_POINTS} from "../apiData";

export async function signUpRequest(request, newUserData) {
    try {
        const response = await request.post(`${process.env.API_URL}${API_URL_END_POINTS.signUpEndPoint}`, {data: newUserData});
        if (response.ok) {
            const data = await response.json();
            console.log('User has been successfully created ' + JSON.stringify(data));
        } else {
            console.error(`Failed to create user: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error during sign-up request:', error);
    }
}