import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string,
    status: boolean | string
}

class ListBarberHaircutService {
    async execute({ status, user_id }: HaircutRequest) {

        if (!user_id) {
            return []
        }

        const haircuts = await prismaClient.barber.findMany({
            where: {
                user_id: user_id,
                haircuts: {
                    some: {
                        status: status === 'true' ? true : false,
                    },
                },
            },
            select: {
                barber_name: true,
                id: true,
                haircuts: true
            },
            distinct: "id"
        })

        return haircuts
    }
}

export { ListBarberHaircutService }