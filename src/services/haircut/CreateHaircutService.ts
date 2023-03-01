import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string
    name: string
    price: number
}

class CreateHaircutService {
    async execute({ name, price, user_id }: HaircutRequest) {

        if (!name || !price) {
            throw new Error("Erro!")
        }

        try {
            const haircutAlreadyExists = await prismaClient.haircut.findFirst({
                where: {
                    AND: {
                        user_id: user_id,
                        name: name,
                    }
                }
            })

            if (haircutAlreadyExists) {
                throw new Error("Haircut already register")
            }

            const myHaircuts = await prismaClient.haircut.count({
                where: {
                    user_id: user_id
                }
            })

            const user = await prismaClient.user.findFirst({
                where: {
                    id: user_id
                },
                include: {
                    subscriptions: true,
                }
            })

            if (myHaircuts >= 3 && user?.subscriptions?.status !== 'active') {
                throw new Error("Not authorized")
            }

            const haircut = await prismaClient.haircut.create({
                data: {
                    name: name,
                    price: price,
                    user_id: user_id
                }
            })

            return haircut
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}

export { CreateHaircutService }