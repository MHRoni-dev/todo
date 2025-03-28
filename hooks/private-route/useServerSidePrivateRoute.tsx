"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function useServerSidePrivateRoute() {
  const token = (await cookies()).get('token')?.value
  if(!token) {
    redirect('auth/login')
  }
  return !!token
}
