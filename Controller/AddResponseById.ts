import { Request, Response } from "express"
import Form, { formI } from "../Models/Form.model"

const AddResponseById = async (req: Request, res: Response) => {
  const responses = req.body.form as { [key: string]: string | string[] }
  const id = req.body.id
  if (!responses) return res.sendStatus(400)
  try {
    const exists = await Form.findById(id)
    if (!exists) return res.status(400).send({ message: "Form Not Found" })
    let alreadySubmitted = false
    exists.responses.forEach(response => {
      if (response!.email === responses.email) alreadySubmitted = true
    })
    if (alreadySubmitted)
      return res.status(401).send({ message: "Already Submitted" })
    await exists.updateOne({ $push: { responses } })
    return res.status(200).send({ message: "Response Saved" })
  } catch (err) {
    console.log({ CreateForm: err })
    return res.status(500).send(err)
  }
}

export default AddResponseById
