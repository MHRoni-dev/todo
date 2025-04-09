"use client";

import QueryProvider from '@/app/components/QueryProvider';
import { useLogoutUser } from '@/app/feature/user/userQueries';
import { LogOut } from 'lucide-react';


export default function Logout() {

  return (
    <QueryProvider>
      <LogoutButton />
    </QueryProvider>
  )
}

function LogoutButton  ()  {
  const logout = useLogoutUser();

  const handleLogut = () => {
    logout.mutate();
  }
  return (
    <LogOut data-tour="logout-button" onClick={handleLogut} className={`cursor-pointer ${logout.isLoading ? "opacity-50" : "opacity-100"}`} />
  )
}
