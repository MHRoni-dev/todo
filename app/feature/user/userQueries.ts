import { useMutation, useQuery } from '@tanstack/react-query'
import { checkUserReq, loginUserReq, registerUserReq } from './userService'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useRegisterUser = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: registerUserReq,
    onSuccess: () => {
      toast.success('User Registered Successfully')
      router.replace('./login', undefined)
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  })
}


export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUserReq,
    onSuccess: () => {
      toast.success('User Logged In Successfully')
    },
    onError: (error : { response?: {data?: { message?: string }}}) => {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  })
}


export const useCheckUser = () => {
  return useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: checkUserReq,
  })
}