import { Request, Response } from "express"
import Form, { formI } from "../Models/Form.model"

const GetFormById = async (req: Request, res: Response) => {
  const id = req.body.id as formI["formName"]
  if (!id) return res.sendStatus(400)
  try {
    const form = await Form.findById(id).lean()
    if (!form) return res.status(404).send({ message: "Form Not Found" })
    if (!form.active)
      return res.status(403).send({ message: "Form has Been Closed." })
    else return res.status(200).send({ form })
  } catch (err) {
    console.log({ GetForm: err })
    return res.status(500).send(err)
  }
}

export default GetFormById
