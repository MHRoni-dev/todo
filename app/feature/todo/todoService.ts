import { CreateTodo, Todo } from '@/app/api/todo/schema';
import { getDeletedTodosFromIDB, getTodosFromIDB, markAsDeletedInIDB, reorderTodosInIDB, saveTodoToIDB, updateTodoInIDB } from '@/lib/idb';
import axios from 'axios';


export const createTodoReq = async (todo: CreateTodo) => {
    if(navigator.onLine) {
      console.log('submitting online')
      return await axios.post('/api/todo', todo)
    }else {
      console.log('submitting offline')
      return await saveTodoToIDB({...todo, synced: "false"})
    }
 
};

export const fetchAllTodosReq = async () => {
  if(navigator.onLine) {
    console.log('fetching online')
    return (await axios.get('/api/todo')).data as Todo[]

  }else {
    console.log('fetching offline')
    const data = await getTodosFromIDB()
    console.log(await getDeletedTodosFromIDB())
    return data
  }
};

export const updateTodoReq = async (todo: Todo) => {
  if(navigator.onLine) {
    console.log("updating online")
    return axios.put(`/api/todo/${todo._id}`, todo)
  }else{
    console.log('updating offline')
    return updateTodoInIDB({...todo, synced: "false"})
  }
};

export const deleteTodoReq = async ({todoId}: {todoId: string, notOptimistic?: boolean}) => {
  if(navigator.onLine) {
    console.log("deleting online")
    return await axios.delete(`/api/todo/${todoId}`)
  }else{
    console.log("deleting offline")
    return await markAsDeletedInIDB({todoId, synced: "false"})
  }
};

export const reorderTodos = async ({from, to} : {from: Todo, to: Todo}) => {
  if(navigator.onLine) {
    return await axios.put('/api/todo', {from, to})
  }else {
    return await reorderTodosInIDB({from, to})
  }
};

