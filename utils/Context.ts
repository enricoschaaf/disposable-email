import { customAlphabet } from "nanoid"
import { createContext } from "react"

export const LocalContext = createContext(
  customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 7)()
)
