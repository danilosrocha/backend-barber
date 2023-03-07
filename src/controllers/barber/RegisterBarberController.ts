import { Request, Response } from "express"
import { RegisterBarberSevice } from "../../services/barber/RegisterBarberSevice"

class RegisterBarberController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const { barber_name } = req.body

        const registerBarberSevice = new RegisterBarberSevice()

        const barber = await registerBarberSevice.execute({ barber_name, user_id })

        return res.json(barber)
    }

}

export { RegisterBarberController }