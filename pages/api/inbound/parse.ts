import { PrismaClient } from "@prisma/client"
import { IncomingForm } from "formidable"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = new IncomingForm()
    const {
      fields: { from, to, subject, html },
      files
    } = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })
    const { id } = await prisma.email.create({
      data: {
        from: typeof from === "string" && from,
        to: typeof to === "string" && to,
        subject: typeof subject === "string" ? subject : "",
        html: typeof html === "string" ? html : ""
      },
      select: { id: true }
    })
    const [, attachments] = Object.entries(files)
    if (attachments) {
      await Promise.all(
        attachments.map(([, file]) => {
          prisma.attachment.create({
            data: {
              name: file.name,
              url: "url",
              Email: { connect: { id } }
            }
          })
        })
      )
    }
    res.end()
  }
  res.status(405).end()
}

export const config = {
  api: {
    bodyParser: false
  }
}
