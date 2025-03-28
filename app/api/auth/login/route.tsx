import { loginUserSchema, User as TUser } from '../schema'
import { connectDB } from '@/lib/mongodb';
import User from '@/model/User';
import { Hash } from '@/lib/hash';
import Token from '@/lib/token';
import AppError, { SendErrorResponse } from '@/lib/error';
import logger from '@/lib/logger';
import SendResponse from '@/lib/response';
import config from '@/config/env/config';
import { cookies } from 'next/headers';

export async function POST(req : Request) {
  try {
    
    // verify user data
  const body = await req.json()
  const {success, data, error} = await loginUserSchema.safeParseAsync(body);
  if(!success) {
    throw new AppError( "AUTH_LOGIN_001", error.errors[0].message, 400, error.errors)
  }

  // check if user exists
  await connectDB()
  const user = await User.findOne<TUser>({username: data?.username}) 
  if(!user) {
    throw new AppError("AUTH_LOGIN_002", "Username or password is incorrect", 401)
  }

  // check if password is correct
  const isCorrectPassword = await Hash.verifyPassword(data!.password, user.password)
  if(!isCorrectPassword) {
    logger.warn(`User ${user.username} failed to login for wrong password`)
    throw new AppError("AUTH_LOGIN_003", "Username or password is incorrect", 401)
  }

  // create token
  const token = Token.sign({
    _id: user._id,
    username: user.username,
  })

  logger.info(`User ${user.username} logged in`);

  // return token
  (await cookies()).set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: config.JWT.JWT_EXPIRES_IN
  })
  return SendResponse(200, "User logged in successfully", {token})


  } catch (error ) {
    return SendErrorResponse(error as (AppError | Error))
  }
}