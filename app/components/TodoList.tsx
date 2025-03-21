"use client";

import React, { useMemo } from 'react'
import TodoItem from './TodoItem';
import { useTodos } from '../feature/todoQueries';

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
    <div className='max-w-md space-y-4'>
      {
        filterdData.length > 0 ? filterdData.map(todo => (
          <TodoItem key={todo._id} todo={todo} />
        )) : <div className='py-2'>No todo {status}</div>
      }
      </div>
  )
}
