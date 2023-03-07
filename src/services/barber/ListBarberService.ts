import prismaClient from "../../prisma"

interface ListBarberRequest {
    user_id: string
    status: string | boolean
}

class ListBarberService {
    async execute({ user_id, status }: ListBarberRequest) {

        const barber = await prismaClient.barber.findMany({
            where: {
                user_id,
                status: status === 'true' ? true : false
            },
            select: {
                id: true,
                barber_name: true,
                hair_cuts: true,
                status: true,
                services: {
                    select: {
                        id: true,
                        customer: true,
                        time: true,
                        haircut: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            }
                        }
                    }
                }

            }
        })

        return barber
    }
}

export { ListBarberService }