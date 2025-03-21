"use client";

import { CardTitle } from '@/components/ui/card';
import TodoList from './TodoList';
import { useDnd } from '@/context/DndProvider';

export default function TodoView() {

  const {overId} = useDnd()
  
  return (
    <>
      <div className='space-y-4'>
        <CardTitle style={{color: overId === "active" ? "green" : ""}}>Active</CardTitle>
        <TodoList status='active' />
      </div>
      <div className='space-y-4'>
        <CardTitle style={{color: overId === "completed" ? "green" : ""}}>Completed</CardTitle>
        <TodoList status='completed' />
      </div>
    </>
  )
}
