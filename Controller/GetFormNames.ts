import { Request, Response } from "express"
import Form, { formI } from "../Models/Form.model"

const GetForms = async (req: Request, res: Response) => {
  try {
    const forms =
      (await Form.find({}, { formName: 1, active: 1, logo: 1 }).lean()) || []
    return res.status(200).send({ forms })
  } catch (err) {
    console.log({ GetForms: err })
    return res.status(500).send(err)
  }
}

export default GetForms
