"use client";

import React, { useMemo } from 'react'
import TodoItem from './TodoItem';
import { useTodos } from '../feature/todo/todoQueries';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Sortable from '@/components/dnd/SortableItem';

type Props = {
  status : "all" | "active" | "completed"
}

export default function TodoList({status} : Props) {

  const {data: list = [], isLoading} = useTodos()
  
  const filterdData = useMemo(() => list.filter(todo => status === "all" ? todo : status === "active" ? !todo.completed : todo.completed) , [list, status])
  if(isLoading) {
    return <div>Loading...</div>
  }
  

  return (
    <SortableContext id={status} items={filterdData.map(todo => ({id: todo._id}))} strategy={verticalListSortingStrategy}>
      <Sortable id={status} data={{type: "container"}}>
        <div className='max-w-md space-y-4'>
        {
          filterdData.length > 0 ? filterdData.map(todo => (
            <TodoItem key={todo._id} todo={todo} />
          )) : <div className='pt-2 pb-14'>No todo {status}</div>
        }
        </div>
      </Sortable>
    </SortableContext>
  )
}
