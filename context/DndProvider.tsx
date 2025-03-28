"use client";
import { Todo } from '@/app/api/todo/schema';
import { useTodoUpdate } from '@/app/feature/todo/todoQueries';
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
    // setOverId(null);
    // const {over, active} = e;
    // if(over && active) {
    //   const todo = active.data.current?.todo as (Todo|undefined);
    //   const todoSortable = active.data.current?.sortable ;
    //   const overTodo = over.data.current?.todo as (Todo|undefined);
    //   const overSortable = over.data.current?.sortable;

    //   if(overTodo && todo){
    //       updateTodo.mutate({
    //           ...overTodo,
    //         order: todo.order
    //       })
    //       updateTodo.mutate({
    //         ...todo,
    //         order: overTodo.order
    //       })
    //     }
    //   if(todo) {
    //     if((overSortable.containerId === "completed" && todo?.completed) || (overSortable.containerId === "active" && !todo?.completed) ) {
    //       return false
    //     }else{
    //       updateTodo.mutate({
    //         ...todo,
    //         completed: overSortable.containerId === "completed"
    //       })
    //     }
        
    //   }
    // }
  }

  return (
    <DndContextProvider.Provider value={{overId, setOverId}}>
      <DndContext collisionDetection={closestCorners}  onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        {children}
      </DndContext>
    </DndContextProvider.Provider>
  )
}