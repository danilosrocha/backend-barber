import { Request, Response } from "express";
import { ListBarberService } from "../../services/barber/ListBarberService";

class ListBarberController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id
        const status = req.query.status as string

        const listBarberService = new ListBarberService()

        const schedule = await listBarberService.execute({ user_id, status })

        return res.json(schedule)
    }
}

export { ListBarberController }

