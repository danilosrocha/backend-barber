import prismaClient from "../../prisma"
import moment from 'moment';

interface CheckSubscription {
    user_id: string
    barber_id: string
    date: string
}

interface ItemProps {
    date: string
    times: string[]
}

class CheckTimeAvaliableService {
    async execute({ user_id, barber_id, date }: CheckSubscription) {

        let barber = await prismaClient.barber.findFirst({
            where: {
                AND: {
                    id: barber_id,
                    user_id
                }
            },
            select: {
                id: true,
                barber_name: true,
                services: {
                    select: {
                        date: true,
                        time: true
                    }
                }
            }
        })

        let uniqueDates = barber?.services.reduce((unique: any, current: any) => {
            const index = unique.findIndex((item: any) => item.date === current.date)
            if (index === -1) {
                return [
                    ...unique,
                    {
                        date: current.date,
                        times: [current.time]
                    }
                ]
            }
            unique[index].times.push(current.time)
            return unique
        }, [])

        const findDate = uniqueDates.find((item: ItemProps) => {
            return item.date === date
        })

        barber.services = findDate

        return barber
    }
}

export { CheckTimeAvaliableService }