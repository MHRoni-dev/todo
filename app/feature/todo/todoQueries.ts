import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTodoReq, deleteTodoReq, fetchAllTodosReq, reorderTodos, updateTodoReq } from './todoService'
import { CreateTodo, Todo } from '../../api/todo/schema'
import { toast } from 'sonner'
import { deleteTodoInIDB, syncTodoInIDB, updateTodoInIDB } from '@/lib/idb'

export const useTodos =  () => {
  return useQuery<Todo[]>({
    networkMode: 'always',
    queryKey: ['todo'],
    queryFn: fetchAllTodosReq
  })
}


export const useTodoAdd = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTodoReq,
    networkMode: 'always',
    onMutate: (todo: CreateTodo & {notOptimistic?: boolean}) => {
      queryClient.cancelQueries({
        queryKey: ['todo'],
      })
      if(!todo.notOptimistic) {
        queryClient.setQueryData(['todo'], (oldTodos : Todo[]) => oldTodos ? [{_id: Date.now().toString(), ...todo}, ...oldTodos] : [{_id: Date.now().toString(), ...todo}])
      }
    },
    onSuccess: async (data, {notOptimistic}) => {
      if(!notOptimistic) {
        toast.success('Todo Added Successfully')
      }
      if(data){
        await syncTodoInIDB(data?.data)
      }
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
    networkMode: 'always',
    onMutate: (todo: Todo & {notOptimistic?: boolean} ) => {
      queryClient.cancelQueries({
        queryKey: ['todo'],
      })
      queryClient.setQueryData(['todo'], (oldTodos : Todo[]) => oldTodos ? oldTodos.map((t: Todo) => t._id === todo._id ? todo : t) : [todo])
    },
    onSuccess: async (res) => { 
      if(res ) {
        await updateTodoInIDB({...res?.data, synced: "true"})
      }
    },
    onError: (error) => {
      console.log(error)
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
    networkMode: 'always',
    onMutate: ({todoId}: {todoId: string, notOptimistic?: boolean}) => {
      queryClient.cancelQueries({
        queryKey: ['todo'],
      })
      queryClient.setQueryData(['todo'], (oldTodos : Todo[]) => oldTodos.filter((t: Todo) => t._id !== todoId))
    },
    onSuccess: async (res, todo) => {
      if(!todo.notOptimistic){
        toast.success('Todo Deleted Successfully')
      }
      if(res){
        await deleteTodoInIDB(todo.todoId)
      }
    },
    onError: (e) => {
      console.log(e)
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
    networkMode: 'always',
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