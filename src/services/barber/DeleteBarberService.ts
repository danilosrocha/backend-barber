import prismaClient from "../../prisma"

interface DeleteBarberRequest {
    user_id: string
    barber_id: string
}

class DeleteBarberService {
    async execute({ barber_id, user_id }: DeleteBarberRequest) {
        console.log({
            barber_id,
            user_id
        });

        if (!barber_id || !user_id) {
            throw new Error("Error barber finish service")
        }

        try {
            const belongsToBarber = await prismaClient.barber.findFirst({
                where: {
                    AND: {
                        id: barber_id,
                        user_id: user_id
                    }
                }
            })

            console.log(belongsToBarber);


            if (!belongsToBarber) {
                throw new Error("Not authorized")
            }

            const barber = await prismaClient.barber.update({
                where: {
                    id: barber_id
                },
                data: {
                    status: false
                }
            })

            return barber
        } catch (error) {
            console.log(error);
        }

    }
}

export { DeleteBarberService }