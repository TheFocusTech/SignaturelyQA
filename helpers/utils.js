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
export function generateRandomPassword(length) {
    const digits = '0123456789';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialCharacters = '!$%&_?';

    function getRandomChar(str) {
        return str[Math.floor(Math.random() * str.length)];
    }

    const password = [
        getRandomChar(digits),
        getRandomChar(lowerCaseLetters),
        getRandomChar(upperCaseLetters),
        getRandomChar(specialCharacters),
    ];

    const allCharacters = digits + lowerCaseLetters + upperCaseLetters + specialCharacters;
    while (password.length < length) {
        password.push(getRandomChar(allCharacters));
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}
