import AppError, { SendErrorResponse } from '@/lib/error'
import { createUserSchema } from '../schema'
import User from '@/model/User'
import logger from '@/lib/logger'
import SendResponse from '@/lib/response'
import { Hash } from '@/lib/hash'
import { connectDB } from '@/lib/mongodb'

const registerLogger = logger.child({ endpoint: "/api/auth/register" })

export async function POST(req: Request) {
  try {
  const body = await req.json()
  const {success, data, error} = await createUserSchema.safeParseAsync(body)

  if(!success) {
    throw new AppError("AUTH_REGISTER_001", error.errors[0].message, 400, error.errors)
  }

  await connectDB()

  const existedUser = await User.findOne({username: data?.username})
  if(existedUser) {
    throw new AppError("AUTH_REGISTER_002", "User already exists", 400)
  }

  const hashPassword = await Hash.hashPassword(data!.password)
  data.password = hashPassword

  const user = await User.create(data)
  if(!user) {
    throw new AppError("AUTH_REGISTER_003", "Failed to register user, please try again", 500)
  }
  registerLogger.info({
    message: `new user ${user.username} registered successfully`,
  })
  return SendResponse(201, "User registered successfully")

    
  } catch (error) {
    return SendErrorResponse(error as (Error | AppError))
  }
}