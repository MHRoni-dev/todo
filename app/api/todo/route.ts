import { connectDB } from '@/lib/mongodb';
import Todo from '@/model/todo';
import { NextResponse } from 'next/server';
import { createTodoSchema } from './schema';


// GET all todos
export async function GET() {
  await connectDB();
  const todos = await Todo.find().sort({createdAt: -1});
  return NextResponse.json(todos);
}

// POST create a new todo
export async function POST(req : Request) {
  await connectDB();
  const body = await req.json()
  console.log(body)
  const parsed = createTodoSchema.safeParse(body);
  if(!parsed.success) {
    return NextResponse.json({error: parsed.error.errors}, {status: 400})
  }

  const newTodo = await Todo.create(parsed.data);
  return NextResponse.json(newTodo, {status: 201});
}