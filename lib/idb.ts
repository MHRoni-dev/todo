import { CreateTodo, Todo } from '@/app/api/todo/schema'
import {openDB,} from 'idb'

const DB_NAME = "todo-db"
const STORE_NAME = "todo-store"

export async function getIDB () {
  return openDB(DB_NAME, 3 , {
    upgrade (db) {
      if(!db.objectStoreNames.contains(STORE_NAME)){
        const store = db.createObjectStore(STORE_NAME, {keyPath: "_id"})
        if(store.indexNames.contains('synced')){
          store.deleteIndex('synced')
        }
        store.createIndex('synced', 'synced')
        store.createIndex('completed', 'completed')
        store.createIndex('title', 'title')
      }
    }
  })
}

export async function getTodosFromIDB () {
  const db = await getIDB()
  const todos = await db.getAll(STORE_NAME)
  return todos.sort((a, b) => b.order - a.order).filter((todo) => !todo.deleted)
}

export async function saveTodoToIDB (todo: CreateTodo & {synced: 'true' | 'false'}) {
  const db = await getIDB()
  const todos = await db.getAll(STORE_NAME)
  todos.sort((a, b) => b.order - a.order)
  const nextOrder = todos.length > 0 ? todos[0].order + 1 : 0
  
  const newTodo : Todo = {
    ...todo,
    _id: 'temp-' +  Math.random().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    user: Math.random().toString(),
    order: nextOrder
  }
  console.log(newTodo, "creating new todo in IDB")
  await db.put(STORE_NAME, newTodo)
}

export async function syncTodoInIDB (todo: Todo) {
  const db = await getIDB()
  const newTodo = {...todo, synced: "true"}
  console.log(newTodo, "syncing todo in IDB")
  await db.put(STORE_NAME, newTodo)
}

export async function updateTodoInIDB (todo:Todo & {synced : 'true' | 'false'}) {
  const db = await getIDB()
  await db.put(STORE_NAME, todo)
}

export async function getUnSyncedTodosFromIDB () {
 try {
  console.log('searching unsynced')
  const db = await getIDB()
  const tx = db.transaction(STORE_NAME)
  const store = tx.store
  const todos = await store.index('synced').getAll(IDBKeyRange.only("false"))
  await tx.done
  console.log(todos, "unsynced")
  return todos
 } catch (error) {
  console.log(error)
 }
}

export async function markTodoAsSyncedInIDB (id: string, newId: string) {
  const db = await getIDB()
  const todo = await db.get(STORE_NAME, id)
  console.log('checking if todo exist in local', todo, newId)
  if(todo && newId){
    console.log('checked todo exist in local')
    todo.synced = "true" 
    await db.put(STORE_NAME, {...todo, _id: newId})
    await db.delete(STORE_NAME, todo._id)
    console.log('marked todo as synced in IDB')
  }
}

export async function markAsDeletedInIDB ({todoId, synced}: {todoId: string, synced?: 'true' | 'false'}) {
  const db = await getIDB()
  console.log(todoId, synced, "fetching todo in local")
  const todo = await db.get(STORE_NAME, todoId)
  if(todo){
    console.log('local todo found')
   if(!todo._id?.includes('temp-')) {
      todo.deleted = "true" 
      todo.synced = synced
      await db.put(STORE_NAME, todo)
      console.log('local todo updated for future delete')
   }else {
      await db.delete(STORE_NAME, todoId)
      console.log('local todo deleted')
   }
  }
}


export async function getDeletedTodosFromIDB () {
  const db = await getIDB()
  return await db.getAll(STORE_NAME, 'deleted')
}


export async function reorderTodosInIDB ({from, to} : {from: Todo, to: Todo}) {
  const todos = await getTodosFromIDB()
  todos.forEach(async todo => {
    if(from.order < to.order) {
      if(todo.order > from.order && todo.order <= to.order){
        todo.order -= 1
        await updateTodoInIDB(todo)
      }
    }else {
      if(todo.order >= to.order && todo.order < from.order){
        todo.order += 1
        await updateTodoInIDB(todo)
      }
    }
  })
  const updateTodo = todos.find(todo => todo._id === from._id)
  if(updateTodo) {
    updateTodo.order = to.order 
    await updateTodoInIDB(updateTodo)
  }
}

export async function deleteTodoInIDB (todoId: string) {
  console.log('deleting from local ')
  const db = await getIDB()
  await db.delete(STORE_NAME, todoId)
  console.log('deleted from local')
}

