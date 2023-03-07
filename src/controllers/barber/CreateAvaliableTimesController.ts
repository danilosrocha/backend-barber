import { Request, Response } from "express"
import { CreateAvaliableTimesService } from "../../services/barber/CreateAvaliableTimesService"

class CreateAvaliableTimesController {
    async handle(req: Request, res: Response) {

        const { available_at, date, barber_id } = req.body

        const avaliableTimes = new CreateAvaliableTimesService()

        const barber = await avaliableTimes.execute({ available_at, date, barber_id })

        return res.json(barber)
    }

}

export { CreateAvaliableTimesController }