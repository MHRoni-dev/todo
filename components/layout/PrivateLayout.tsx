"use client"

import QueryProvider from '@/app/components/QueryProvider'
import useClientSidePrivateRoute from '@/hooks/private-route/useClientSidePrivateRoute'
import React from 'react'

export default function PrivateLayout({children}:{children: React.ReactNode}) {
  return (
    <QueryProvider>
      <Layout>{children}</Layout>
    </QueryProvider>
  )
}


function Layout ({children}:{children: React.ReactNode}) {
  const isAuthenticated = useClientSidePrivateRoute()
  if(!isAuthenticated) {
    return null
  }

  return (
    <>{children}</>
  )
}
