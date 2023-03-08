import prismaClient from "../../prisma"
import moment from 'moment';

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

        let uniqueDates = schedules.reduce((unique: any, current: any) => {
            const index = unique.findIndex((item: any) => item === current.date)
            if (index === -1) {
                return [...unique, current.date]
            }
            return unique
        }, [])

        uniqueDates = uniqueDates.map((date) => {
            return moment(date, "DD/MM").format("DD/MM")
        })

        return uniqueDates.sort()
    }
}

export { SchedulesDaysService }
