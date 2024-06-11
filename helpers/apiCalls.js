// import { ADMIN_CREDENTIALS } from '../testData.js';

// export async function getUserIdAPI(request, userCredentials) {
//     const response = await request.post(`${process.env.API_URL}/auth/sign_in`, { data: userCredentials });
//     if (!response.ok()) {
//         throw new Error(`Failed to proceed User sign in: ${response.status()}`);
//     }

//     const responseBody = await response.json();
//     const userId = responseBody.user.id;
//     return userId;
// };

// export async function getAdminTokenAPI(request) {
//     const response = await request.post(`${process.env.API_URL}/admin/sign-in`, { data: ADMIN_CREDENTIALS });
//     if (!response.ok()) {
//         throw new Error(`Failed to proceed Admin sign in: ${response.status()}`);
//     }

//     const responseBody = await response.json();
//     const adminToken = responseBody.token.accessToken;
//     return adminToken;
// };

// export async function changeUserPasswordApiAdmin(request, userCredentials) {
//     const userID = await getUserIdAPI(request, userCredentials);
//     const adminToken = await getAdminTokenAPI(request);
   

//     const response = await request.patch(`${process.env.API_URL}/admin/users/${userID}`, {
//         headers: {
//             Authorization: `Bearer ${adminToken}`
//         },
//         data: {
//             password: process.env.USER_PASSWORD
//         }
//     });

//     if (!response.ok()) {
//         throw new Error(`Failed to get User data: ${response.status()}`);
//     }

//     return response;
// };