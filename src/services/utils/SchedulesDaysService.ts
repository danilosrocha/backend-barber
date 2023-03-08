import prismaClient from "../../prisma"

interface CheckSubscription {
    user_id: string
}

class SchedulesDaysService {
    async execute({ user_id }: CheckSubscription) {

        const schedules = await prismaClient.service.findMany({
            where: {
                AND: {
                    user_id,
                    status: true
                }
            },
            select: {
                date: true
            },
            orderBy: [
                { date: 'asc' },
                { time: 'asc' }
            ]
        })

        const uniqueDates = schedules.reduce((unique: any, current: any) => {
            const index = unique.findIndex((item: any) => item === current.date)
            if (index === -1) {
                return [...unique, current.date]
            }
            return unique
        }, [])

        return uniqueDates
    }
}

export { SchedulesDaysService }
