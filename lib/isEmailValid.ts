export default function isEmailValid(email : string) : boolean {
    if (email.trim().length == 0)
        return false

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
    
    return regex.test(email)
}