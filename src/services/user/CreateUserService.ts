import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

export interface CreateUserRequest {
    name: string,
    email: string
    password: string
    address?: string
    strip_customer_id?: string
}

class CreateUserService {
    async execute({ email, name, password }: CreateUserRequest) {

        if (!email) {
            throw new Error("Email incorrect!")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User/Email already exists!")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                password: passwordHash,
                email: email
            }, select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }