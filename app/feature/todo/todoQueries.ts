import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodoReq, deleteTodoReq, fetchAllTodosReq, reorderTodos, updateTodoReq } from './todoService'
import { CreateTodo, Todo } from '../../api/todo/schema'
import { toast } from 'sonner'

export const useTodos =  () => {
  return useQuery<Todo[]>({
    queryKey: ['todo'],
    queryFn: fetchAllTodosReq
  })
}


export const useTodoAdd = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTodoReq,
    onMutate: (todo: CreateTodo) => {
      queryClient.cancelQueries({
        queryKey: ['todo'],
      })
      queryClient.setQueryData(['todo'], (oldTodos : Todo[]) => [{_id: Date.now().toString(), ...todo} ,...oldTodos])
    },
    onSuccess: () => {
      toast.success('Todo Added Successfully')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    }
  })
}

export const useTodoUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTodoReq,
    onMutate: (todo: Todo) => {
      queryClient.cancelQueries({
        queryKey: ['todo'],
      })
      queryClient.setQueryData(['todo'], (oldTodos : Todo[]) => oldTodos.map((t: Todo) => t._id === todo._id ? todo : t))
    },
    onSuccess: () => { 
      // toast.success('Todo Updated Successfully')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    }
  })
}

export const useTodoDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTodoReq,
    onMutate: (todoId : string) => {
      queryClient.cancelQueries({
        queryKey: ['todo'],
      })
      queryClient.setQueryData(['todo'], (oldTodos : Todo[]) => oldTodos.filter((t: Todo) => t._id !== todoId))
    },
    onSuccess: () => {
      toast.success('Todo Deleted Successfully')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    }
  })
}

export const useReorderTodos = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: reorderTodos,
    onSuccess: () => {
    },
    onError: () => {
      toast.error('Something went wrong')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    }
  })
}