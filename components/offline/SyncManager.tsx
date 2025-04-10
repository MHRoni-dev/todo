'use client';
import { useTodoAdd, useTodoDelete, useTodos, useTodoUpdate } from '@/app/feature/todo/todoQueries';
import { getTodosFromIDB, getUnSyncedTodosFromIDB, markTodoAsSyncedInIDB, syncTodoInIDB } from '@/lib/idb';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'

export default function SyncManager() {
  const queryClient = useQueryClient();
  const addTodo = useTodoAdd()
  const updateTodo = useTodoUpdate()
  const deleteTodo = useTodoDelete()
  const {data: todos = [ ], isSuccess, isPending} = useTodos()

  React.useEffect(() => {
    const syncTodos = async () => {
      const unSyncedTodos = await getUnSyncedTodosFromIDB()
      if(unSyncedTodos) {
        unSyncedTodos.forEach(async todo => {
          try {

            //< sync new todo with database and update necessary data in IDB
            if(todo.deleted !== "true" && todo._id?.includes('temp-')) {
                console.log('updating by createing unsynced item')
                addTodo.mutate({...todo,notOptimistic: true}, {
                  async onSuccess(data) {
                    await markTodoAsSyncedInIDB(todo._id, data?.data?._id)
                  },
              })
            }
            //>

            //< sync existing todo with database 
            if(todo.deleted !== "true") {
              updateTodo.mutate({...todo, notOptimistic: true})
            }
            //>

            if(todo.deleted === "true") {
              deleteTodo.mutate({todoId: todo._id, notOptimistic: true})
            }

          } catch (error) {
            console.log('failed to sync ', error)
          }
        })
        queryClient.invalidateQueries({queryKey: ['todo']})
      }
    }

    if(navigator.onLine) syncTodos()
    window.addEventListener('online', syncTodos)
    
    return () => {
      window.removeEventListener('online', syncTodos)
    }
  }, [queryClient, addTodo, updateTodo, deleteTodo])

  React.useEffect(() => {
    const syncToIDB = async () => {
      const localTodos = await getTodosFromIDB()
      if(!isPending && isSuccess) {
        todos.forEach(async todo => {
          if(!localTodos || !localTodos.find(localTodo => todo._id === localTodo._id)) {
            await syncTodoInIDB(todo)
          }
        })
      }
    }
    
    if(navigator.onLine) syncToIDB()
      window.addEventListener('online', syncToIDB)
      
    return () => {
      window.removeEventListener('online', syncToIDB)
    }
  }, [isPending, isSuccess, todos])

  return null
}
