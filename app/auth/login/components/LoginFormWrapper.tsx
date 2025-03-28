'use client'

import QueryProvider from '@/app/components/QueryProvider';
import LoginForm from './LoginForm';

export default function LoginFormWrapper() {
  return (
    <QueryProvider>
      <LoginForm />
    </QueryProvider>
  )
}
