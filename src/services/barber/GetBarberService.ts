import prismaClient from "../../prisma"

interface ListBarberRequest {
    user_id: string
    barber_id: string
}

class GetBarberService {
    async execute({ user_id, barber_id }: ListBarberRequest) {

        const barber = await prismaClient.barber.findFirst({
            where: {
                AND: {
                    id: barber_id,
                    user_id,
                }
            },
            select: {
                barber_name: true,
                status: true,
                hair_cuts: true,
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

export { GetBarberService }