import { connectDB } from '@/lib/mongodb';
import Todo, { ITODO } from '@/model/Todo';
import { NextResponse } from 'next/server';
import { createTodoSchema } from './schema';
import ServerSidePrivateRoute from '@/hooks/private-route/useServerSidePrivateRoute';


// GET all todos
export async function GET() {
  await ServerSidePrivateRoute()
  await connectDB();
  const todos = await Todo.find().sort({order: -1});
  return NextResponse.json(todos);
}

// POST create a new todo
export async function POST(req : Request) {
  const data =await ServerSidePrivateRoute()
  await connectDB();
  const body = await req.json()
  const order = await Todo.find<ITODO>({createdAt : {$lt: new Date(), $gte: new Date().setDate(new Date().getDate() - 1)}}).sort({order: -1}).limit(1);

  const parsed = createTodoSchema.safeParse(body);
  if(!parsed.success) {
    return NextResponse.json({error: parsed.error.errors}, {status: 400})
  }

  const newTodo = await Todo.create({...parsed.data, order: order.length <= 0 ? 0 : order[0].order + 1, user: data._id});
  return NextResponse.json(newTodo, {status: 201});
}