import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.email.findMany()
  res.json(data)
}
