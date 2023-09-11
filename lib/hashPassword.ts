import { hash } from "bcrypt"

export default async function hashPassword(password: string) {
    return await hash(password, "$2b$10$mOpzfUam3VkZ33qDnG4ewu")
}
