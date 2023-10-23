export default function generateRandomString(length: number = 30) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    const randomString = new Array(length)
        .fill(0)
        .map(() => characters[Math.floor(Math.random() * charactersLength)])
        .join("");

    return randomString;
}

console.log(generateRandomString(30));
