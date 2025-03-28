import AppError, { SendErrorResponse } from '@/lib/error';
import SendResponse from '@/lib/response';
import Token from '@/lib/token';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;
    if(!token) {
      throw new AppError("AUTH_CHECK_001", "Please login and try again", 401)
    }

    const data = Token.verify(token);
    return SendResponse(200, `welcome back ${data.username}`)

  } catch (error) {
    return SendErrorResponse(error as (AppError | Error))
  }
}