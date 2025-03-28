import { useMutation } from '@tanstack/react-query'
import { loginUserReq, registerUserReq } from './userService'
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
  const router = useRouter()
  return useMutation({
    mutationFn: loginUserReq,
    onSuccess: () => {
      toast.success('User Logged In Successfully')
      router.replace('./login', undefined)
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong')
    }
  })
}