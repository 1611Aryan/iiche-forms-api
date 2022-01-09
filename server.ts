import Express from "express"
import morgan from "morgan"
import helmet from "helmet"
import mongoose from "mongoose"
import cors from "cors"

import nodemailer from "nodemailer"

process.env.NODE_ENV !== "production" && require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = Express()

app.use(Express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://iiche-recruitments.netlify.app"
        : "http://localhost:3000",
    credentials: true,
  })
)

const MongoURI = process.env.MONGODB_URI

mongoose.connect(MongoURI)

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

const connection = mongoose.connection

connection.once("open", () =>
  console.log("\x1b[36mDatabase is Connected\x1b[0m")
)

app.listen(PORT, () => console.log(`The server is running at port ${PORT}`))
