import prismaClient from "../../prisma";

interface BarberRequest {
    barber_name: string
    user_id: string
}

class RegisterBarberSevice {
    async execute({ barber_name, user_id }: BarberRequest) {

        if (!barber_name) {
            throw new Error("Erro!")
        }

        try {
            const barberAlreadyExists = await prismaClient.barber.findFirst({
                where: {
                    AND: {
                        user_id,
                        barber_name,
                    }
                }
            })

            if (barberAlreadyExists) {
                throw new Error("Barber already register")
            }

            const barber = await prismaClient.barber.create({
                data: {
                    barber_name,
                    user_id,
                }
            })

            return barber
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}

export { RegisterBarberSevice }