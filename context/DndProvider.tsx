"use client";
import { Todo } from '@/app/api/todo/schema';
import { useReorderTodos, useTodoUpdate } from '@/app/feature/todo/todoQueries';
import { closestCorners, DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

interface DndState {
  overId : string | number | null,
  setOverId : React.Dispatch<React.SetStateAction<string | number | null>>,
  dragingTodo : Todo | null
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
  const queryClient = useQueryClient()
  const [overId, setOverId] = React.useState<string | number| null>(null);
  const [dragingTodo, setDragingTodo] = React.useState<Todo | null>(null);
  const updateTodo = useTodoUpdate();
  const reorderTodos = useReorderTodos();

  

  function handleDragStart(e : DragStartEvent) {
    const {active} = e;
    const todo = active.data.current?.todo as Todo;
    setDragingTodo(todo);
  }

  
  function handleDragOver(e : DragOverEvent) {
      const {over} = e;
      if(over) {
        setOverId(over.id)
      }else{
        setOverId(null)
      }
    
  }

  function handleDragMove(e : DragMoveEvent) {
    const {over, active} = e;
   if(over && active) {
    // const overType = over?.data.current?.type;
    // const activeType = active?.data.current?.type; 
    const overStatus = over?.data.current?.sortable?.containerId;
    const activeStatus = active?.data.current?.sortable?.containerId;
    // const overTodo = over?.data.current?.todo as (Todo|undefined);
    // const activeTodo = active?.data.current?.todo as (Todo|undefined);

    if( overStatus !== activeStatus ) {
      queryClient.cancelQueries({queryKey: ['todo']})
      queryClient.setQueryData(['todo'], (todos : Todo[]) => todos.map((todo : Todo) => todo._id === active?.data.current?.todo?._id ? {...todo, completed: overStatus === "completed"} : todo)) 
      updateTodo.mutate({
        ...active?.data.current?.todo,
        completed: overStatus === "completed"
      })
    }
    // if(overType === "todo" && activeType === "todo") {
    //   if(overTodo && activeTodo) {
    //     if(overTodo.order !== activeTodo.order) {
    //       const overIndex = todos?.findIndex((todo : Todo) => todo.order === overTodo.order)
    //       const activeIndex = todos?.findIndex((todo : Todo) => todo.order === activeTodo.order)
    //       if(overIndex !== undefined && activeIndex !== undefined) {
    //         queryClient.cancelQueries({queryKey: ['todo']})
    //         queryClient.setQueryData(['todo'], (todos : Todo[]) => arrayMove(todos, overIndex, activeIndex))
    //         console.log(queryClient.getQueryData(['todo']))
    //       }
    //     }
    //   }
    // }
   }
  }

  function handleDragEnd(e : DragEndEvent) {
    // setOverId(null);
    setDragingTodo(null);
    const {over, active} = e;
    if(over && active) {
      const overType = over?.data.current?.type;
      const activeType = active?.data.current?.type;
      if(overType === "todo" && activeType === "todo") {
        const overTodo = over?.data.current?.todo as (Todo|undefined);
        const activeTodo = active?.data.current?.todo as (Todo|undefined);
        console.log('overtodo', overTodo, 'activetodo', activeTodo)
        const todos = queryClient.getQueryData(['todo']) as (Todo[]|undefined);
        console.log("todos", todos)
        if(todos) {
          
          if(overTodo && activeTodo) {

            queryClient.setQueryData(['todo'], (todos : Todo[]) => todos.map((todo : Todo) => { 
              if(todo._id === overTodo._id) {
                return {
                  ...todo,
                  order: activeTodo.order
                }
              }
              if(todo._id === activeTodo._id) {
                return {
                  ...todo,
                  order: overTodo.order
                }
              }
              return todo
            }))
            queryClient.setQueryData(['todo'], (todos : Todo[]) => arrayMove(todos, todos.findIndex((todo : Todo) => todo._id === activeTodo._id), todos.findIndex((todo : Todo) => todo._id === overTodo._id)))
            console.log('new todos', todos)
            let newOverTodo, newActiveTodo;
            todos.forEach((todo : Todo) => {
                if(todo._id === overTodo._id) {
                  console.log("find over todo")
                  newActiveTodo = todo
                }if(todo._id === activeTodo._id) {
                  console.log('find active todo')
                  newOverTodo = todo
                }
            })
            if(newOverTodo && newActiveTodo) {
                reorderTodos.mutate({from: newOverTodo, to: newActiveTodo})
              }
            }
        }
      }
    }
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
    <DndContextProvider.Provider value={{overId, setOverId, dragingTodo}}>
      <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart}  onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragMove={handleDragMove}>
        {children}
      </DndContext>
    </DndContextProvider.Provider>
  )
}