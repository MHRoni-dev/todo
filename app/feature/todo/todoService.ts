import { CreateTodo, Todo } from '@/app/api/todo/schema';
import axios from 'axios';


export const createTodoReq = async (todo: CreateTodo) => await axios.post('/api/todo', todo);

export const fetchAllTodosReq = async () => (await axios.get('/api/todo')).data as Todo[];

export const updateTodoReq = async (todo: Todo) => axios.put(`/api/todo/${todo._id}`, todo);

export const deleteTodoReq = async (todoId: string) => axios.delete(`/api/todo/${todoId}`);

export const reorderTodos = async ({from, to} : {from: Todo, to: Todo}) => axios.put('/api/todo', {from, to});