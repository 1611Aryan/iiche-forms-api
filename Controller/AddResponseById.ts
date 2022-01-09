import { Request, Response } from "express"
import Form, { formI } from "../Models/Form.model"
import transporter from "../Nodemailer/transporter"

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

    const options = {
      from: process.env.NODEMAILER_SENDER,
      to: response.email,
      subject: "IIChE TIET Recruitments",
      html: `
        Hello ,
  <br />
  <br />
  We hope that you and your family are doing great during this pandemic.
  <br />
  This mail is to confirm that we have successfully received your recruitment form for IIChE TIET and our team will contact you shortly with further information.
  <br /><br />
  We recommend you to stay active on your gmail and WhatsApp.
  <br /><br />
  Good Luck for the next round!!
  <br /><br />
  If you have any query you can contact the following people
  <br />
  Parth Sood (GenSec) : 7986810284
  <br />
  Or simply reply to this mail thread
  <br /><br />
  Regards
  Team IIChE TIET
        `,
    }
    transporter.sendMail(options)

    await exists.update({ $push: { responses: response } })
    return res.status(200).send({ message: "Response Saved" })
  } catch (err) {
    console.log({ CreateForm: err })
    return res.status(500).send(err)
  }
}

export default AddResponseById
