"use server"

import Token from '@/lib/token'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ServerSidePrivateRoute() {
  const token = (await cookies()).get('token')?.value
  const data = Token.verify(token as string)
  if(!token) {
    redirect('auth/login')
  }

  return data
}
