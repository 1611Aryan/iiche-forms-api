import { Document, model, Schema } from "mongoose"

export type question = {
  question: string
  responseType:
    | "String"
    | "Number"
    | "Phone"
    | "Email"
    | "Text"
    | "Checkbox"
    | "Radio"
  name: string
  options?: string[]
  required: boolean
}

export type formI = {
  formName: string
  active: boolean
  formBg?: string
  logo?: string
  questions: question[]
  responses: { [key: string]: string | string[] }[]
}

const FormSchema = new Schema<formI>(
  {
    formName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    questions: {
      type: [
        {
          question: String,
          responseType: String,
          name: String,
          options: [String],
          required: Boolean,
        },
      ],
      required: true,
      _id: false,
    },
    formBg: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    responses: {
      type: [{}],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Form = model<formI & Document>("Question", FormSchema)

export default Form
