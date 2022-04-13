import { MailOptions } from "nodemailer/lib/sendmail-transport"
import transporter from "../Nodemailer/transporter"

const sendRegistrationMail = async (email: string) => {
  const options: MailOptions = {
    from: process.env.NODEMAILER_SENDER || "",
    to: email,
    subject: "Twosome Conundrum Registration Successfull",
    html: `
          Hello ,
    <br />
    <br />
    We hope that you  are doing great.
    <br />
    This mail is to confirm that we have successfully received your Registration for IIChE TIET's event Twosome Conundrum and our team will contact you shortly with further information.
    <br /><br />
    We recommend you to stay active on your gmail and WhatsApp.
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

  await transporter.sendMail(options)
}

export default sendRegistrationMail
