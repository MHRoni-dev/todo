"use client"

import { useRegisterUser } from '@/app/feature/user/userQueries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input, PasswordInput } from '@/components/ui/input'
import { CreateUser } from '@/app/api/auth/schema'
import { useState } from 'react'
export default function RegisterForm() {
  const register = useRegisterUser()
  const [formData, setFormData] = useState<CreateUser>({
    username: '',
    password: ''
  })

  return (
    <Card  className='max-w-md w-full'>
      <CardHeader>
        <CardTitle className='text-2xl'>Register And Start Planning</CardTitle>
        <CardDescription>Enter your username and password</CardDescription>
      </CardHeader>
        <CardContent className='space-y-4'>
          <Input placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}/>
          <PasswordInput placeholder="XXXXXXXX" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={() => register.mutate(formData)}>Register</Button>
        </CardFooter>

    </Card>
  )
}
