import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/NewScheduleService";

class NewScheduleController {
    async handle(req: Request, res: Response) {
        const { haircut_id, customer, time, barber_id } = req.body
        const user_id = req.user_id

        const newScheduleService = new NewScheduleService()

        const schedule = await newScheduleService.execute({ customer, haircut_id, time, user_id, barber_id })

        return res.json(schedule)
    }
}

export { NewScheduleController }
