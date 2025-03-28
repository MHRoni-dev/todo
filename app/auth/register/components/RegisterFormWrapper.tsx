"use client"
import QueryProvider from '@/app/components/QueryProvider';
import RegisterForm from './RegisterForm';

export default function RegisterFormWrapper() {
  return (
    <QueryProvider>
      <RegisterForm />
    </QueryProvider>
  )
}
