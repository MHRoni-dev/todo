"use client"

import { useLoginUser } from '@/app/feature/user/userQueries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, PasswordInput } from '@/components/ui/input'
import { LoginUser } from '@/app/api/auth/schema'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginForm() {
  const login = useLoginUser()
  const [formData, setFormData] = useState<LoginUser>({
    username: '',
    password: ''
  })

  return (
    <Card  className='max-w-md w-full'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login And Start Planning</CardTitle>
        <CardDescription>Enter your username and password</CardDescription>
      </CardHeader>
        <CardContent className='space-y-4'>
          <Input placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}/>
          <PasswordInput placeholder="XXXXXXXX" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
          <Button className='w-full' onClick={() => login.mutate(formData)}>Login</Button>
          <Link href="/auth/register" className='text-sm'>Don&apos;t have an account? Register</Link>
        </CardFooter>
    </Card>
  )
}
