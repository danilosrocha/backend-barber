import prismaClient from "../../prisma"

interface NewScheduleRequest {
    user_id: string
    haircut_id: string
    customer: string
    time: string
    barber_id: string
}

class NewScheduleService {
    async execute({ customer, haircut_id, time, user_id, barber_id }: NewScheduleRequest) {
        if (!customer || !haircut_id) {
            throw new Error("Error schedule new service")
        }

        try {
            const barberExists = await prismaClient.barber.findFirst({
                where: {
                    AND: {
                        id: barber_id,
                        user_id,
                    }
                }
            })

            if (!barberExists) {
                throw new Error("Erro update barber!")
            }

            await prismaClient.barber.update({
                where: {
                    id: barber_id
                },
                data: {
                    hair_cuts: (barberExists.hair_cuts + 1)
                }
            })

            const schedule = await prismaClient.service.create({
                data: {
                    customer,
                    time,
                    haircut_id,
                    user_id,
                    barber_id,
                }
            })

            return schedule

        } catch (error) {
            throw new Error("Error schedule new service")
        }
    }
}

export { NewScheduleService }