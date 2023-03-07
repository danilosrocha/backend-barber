import { Router, Request, Response } from "express";

// Middleware
import { isAuthenticated } from './middlewares/isAuthenticated'
// User
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
// Haircut
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";
// Utils
import { CheckSubscriptionController } from "./controllers/utils/CheckSubscriptionController";
import { CountHaircutsController } from "./controllers/utils/CountHaircutsController";
// Schedule
import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController";
// Barber
import { RegisterBarberController } from "./controllers/barber/RegisterBarberController";
import { ListBarberController } from "./controllers/barber/ListBarberController";
import { DeleteBarberController } from "./controllers/barber/DeleteBarberController";
import { UpdateBarberController } from "./controllers/barber/UpdateBarberController";
import { SumBarberCutController } from "./controllers/barber/SumBarberCutController";
import { GetBarberController } from "./controllers/barber/GetBarberController";

const router = Router()

router.get('/', (req: Request, res: Response) => {

    return res.json({ ok: true })
})

// Routes - User
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.put('/user/update', isAuthenticated, new UpdateUserController().handle)

// Routes - Haircuts
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle)

router.get('/haircuts', isAuthenticated, new ListHaircutController().handle)

router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)

router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle)

// Routes - Utils
router.get('/check', isAuthenticated, new CheckSubscriptionController().handle)

router.get('/haircuts/count', isAuthenticated, new CountHaircutsController().handle)

// Routes - Schedule
router.post('/schedule', isAuthenticated, new NewScheduleController().handle)

router.get('/schedules', isAuthenticated, new ListScheduleController().handle)

router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle)

// Routes - Barber
router.post('/barber', isAuthenticated, new RegisterBarberController().handle)

router.get('/barbers', isAuthenticated, new ListBarberController().handle)

router.get('/barber', isAuthenticated, new GetBarberController().handle)

router.put('/barber/del', isAuthenticated, new DeleteBarberController().handle)

router.put('/barber', isAuthenticated, new UpdateBarberController().handle)

router.put('/barber/count', isAuthenticated, new SumBarberCutController().handle)

//  

export { router }