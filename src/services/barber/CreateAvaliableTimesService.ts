import prismaClient from "../../prisma";

interface AvaliableTimeRequest {
    date: Date
    available_at: string[]
    barber_id: string
}

class CreateAvaliableTimesService {
    async execute({ available_at, barber_id, date }: AvaliableTimeRequest) {

        if (!barber_id || !available_at || !date) {
            throw new Error("Erro! Preencha os dados")
        }

        try {
            const barber = await prismaClient.barberAvailability.create({
                data: {
                    date,
                    available_at,
                    barber_id
                }
            })

            return barber
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}

export { CreateAvaliableTimesService }