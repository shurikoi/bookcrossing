import { hash } from "bcrypt"

export default function hashPassword(password: string) {
    return hash(password, "$2b$10$mOpzfUam3VkZ33qDnG4ewu")
}
