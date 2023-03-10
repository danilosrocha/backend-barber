import { Request, Response } from "express"
import { CreateHaircutService } from "../../services/haircut/CreateHaircutService"

class CreateHaircutController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const { name, price, time } = req.body

        const createHaircutService = new CreateHaircutService()

        const haircut = await createHaircutService.execute({ name, price, time, user_id })

        return res.json(haircut)
    }

}

export { CreateHaircutController }