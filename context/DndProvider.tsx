"use client";
import { Todo } from '@/app/api/todo/schema';
import { useTodoUpdate } from '@/app/feature/todoQueries';
import { closestCorners, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import React from 'react';

interface DndState {
  overId : string | number | null,
  setOverId : React.Dispatch<React.SetStateAction<string | number | null>>
}

const DndContextProvider = React.createContext<DndState | null>(null);

export const useDnd = () => {
  const context = React.useContext(DndContextProvider);
  if (!context) {
    throw new Error('useDnd must be used within a DndProvider');
  }
  return context
}

export const DndProvider = ({children} : {children : React.ReactNode}) => {
  const [overId, setOverId] = React.useState<string | number| null>(null);
  const updateTodo = useTodoUpdate();

 

  function handleDragOver(e : DragOverEvent) {
      const {over} = e;
      if(over) {
        setOverId(over.id)
      }else{
        setOverId(null)
      }
    
  }

  function handleDragEnd(e : DragEndEvent) {
    const {over, active} = e;
    if(over && active) {
      const todo = active.data.current as (Todo|undefined);
     
      if(todo) {
        if(over.id === "completed" && todo?.completed) {
          return false
        }else if(over.id === "active" && !todo?.completed) {
          return false
        }else{
          updateTodo.mutate({
            ...todo,
            completed: over.id === "completed"
          })
        }
        
      }
    }
  }

  return (
    <DndContextProvider.Provider value={{overId, setOverId}}>
      <DndContext collisionDetection={closestCorners}  onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        {children}
      </DndContext>
    </DndContextProvider.Provider>
  )
}