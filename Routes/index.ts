import { Router } from "express"
import AddResponseById from "../Controller/AddResponseById"
import CreateForm from "../Controller/CreateForm"
import GetFormById from "../Controller/GetForm"
import GetForms from "../Controller/GetFormNames"

const router = Router()

router.get("/", GetForms)

router.post("/create", CreateForm)

router.post("/formById", GetFormById)

router.post("/addResponse", AddResponseById)

export default router
