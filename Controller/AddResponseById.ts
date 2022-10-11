import { Request, Response } from "express"
import Form from "../Models/Form.model"

const AddResponseById = async (req: Request, res: Response) => {
  const response = req.body.response as { [key: string]: string | string[] }
  const id = req.body.id
  console.log(response)
  if (!response || !id) return res.sendStatus(400)
  try {
    const exists = await Form.findById(id)
    if (!exists) return res.status(400).send({ message: "Form Not Found" })
    let alreadySubmitted = false

    exists.responses.length > 0 &&
      exists.responses.forEach(resp => {
        if (resp!.email === response.email) alreadySubmitted = true
      })
    if (alreadySubmitted)
      return res.status(401).send({ message: "Already Submitted" })

    //sendRegistrationMail(response.email as string)

    await exists.update({ $push: { responses: response } })
    return res.status(200).send({ message: "Response Saved" })
  } catch (err) {
    console.log({ CreateForm: err })
    return res.status(500).send(err)
  }
}

export default AddResponseById
