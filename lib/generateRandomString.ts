export default function generateRandomString(length: number = 30) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const randomString = new Array(length)
        .fill(0)
        .map(() => characters[Math.floor(Math.random() * (characters.length - 1))])
        .join("");

    return randomString;
}
