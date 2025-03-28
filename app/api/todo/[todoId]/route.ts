import { connectDB } from '@/lib/mongodb';
import Todo from '@/model/Todo';
import { NextResponse } from 'next/server';


export const PUT = async (req: Request, { params }: { params: { todoId: string }}) => {
  const {todoId} = await params;
  if(!todoId) {
    return NextResponse.json("todoId is required", {status: 400})
  }

  const body = await req.json()
  await connectDB();
  const todo = await Todo.findByIdAndUpdate(todoId, body, {new: true});
  return NextResponse.json(todo);
}

export const DELETE = async (req: Request, { params }: { params: { todoId: string }}) => {
  const {todoId} = await params;
  if(!todoId) {
    return NextResponse.json("todoId is required", {status: 400})
  }
  await connectDB();
  const todo = await Todo.findByIdAndDelete(todoId);
  return NextResponse.json(todo);
}