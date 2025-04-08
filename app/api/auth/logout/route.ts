import { cookies } from 'next/headers';


export const POST = async () => {
  try {
    const cookiesObj = await cookies()
    cookiesObj.delete('token')
    return new Response(JSON.stringify({message: 'Logged out successfully'}), {status: 200})
  } catch  {
    return new Response(JSON.stringify({message: 'Something went wrong'}), {status: 500})
  }
}