"use client";

import { CardTitle } from '@/components/ui/card';
import TodoList from './TodoList';
import { useDnd } from '@/context/DndProvider';
import { DragOverlay } from '@dnd-kit/core';
import TodoItem from './TodoItem';


export default function TodoView() {

  const { dragingTodo} = useDnd()

  
  return (
    <>

      <div className='space-y-4 welcome' data-tour="active-container">
        <CardTitle >Active</CardTitle>
        <TodoList status='active' />
      </div>
      <div className='space-y-4' data-tour="completed-container">
        <CardTitle >Completed</CardTitle>
        <TodoList status='completed' />
      </div>
      <DragOverlay>
        {dragingTodo ? (
          <TodoItem todo={dragingTodo} />
        ) : null}
      </DragOverlay>
    </>
  )
}
