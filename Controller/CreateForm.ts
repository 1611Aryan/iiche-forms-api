import { Request, Response } from "express"
import Form, { formI } from "../Models/Form.model"

const CreateForm = async (req: Request, res: Response) => {
  const form = req.body.form as formI
  if (!form || !form.formName || !form.questions) return res.sendStatus(400)
  try {
    const exists = await Form.findOne({ formName: form.formName }).lean()
    if (exists)
      return res.status(400).send({ message: "Form Name already in Use" })
    await Form.create({ ...form, active: true })
    return res.status(200).send({ message: "Form Created" })
  } catch (err) {
    console.log({ CreateForm: err })
    return res.status(500).send(err)
  }
}

export default CreateForm
