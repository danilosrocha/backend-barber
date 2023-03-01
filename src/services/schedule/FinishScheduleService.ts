import prismaClient from "../../prisma"

interface FinishScheduleRequest {
    user_id: string
    schedule_id: string
}

class FinishScheduleService {
    async execute({ schedule_id, user_id }: FinishScheduleRequest) {
        if (!schedule_id || !user_id) {
            throw new Error("Error schedule finish service")
        }

        try {
            const belongsToUser = await prismaClient.service.findFirst({
                where: {
                    AND: {
                        id: schedule_id,
                        user_id: user_id
                    }
                }
            })
            
            if (!belongsToUser) {
                throw new Error("Not authorized")
            }

            await prismaClient.service.delete({
                where: {
                    id: schedule_id
                }
            })

            return { message: "Finalizado com sucesso" }
        } catch (error) {

        }

    }
}

export { FinishScheduleService }