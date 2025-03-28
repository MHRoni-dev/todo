"use client"
import { useCheckUser } from '@/app/feature/user/userQueries'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useClientSidePrivateRoute() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const {isLoading, isSuccess} = useCheckUser() 

  useEffect(() => {
    if(!isLoading) {
      setIsLoaded(true)
      if(isSuccess) {
        setAuthenticated(true)
      }
    }
  
  },[isSuccess, isLoading])

  useEffect(() => {
    if(!authenticated && isLoaded ) {
      router.push('auth/login', undefined)
    }
  },[authenticated, router, isLoaded])

 

  return authenticated
}
