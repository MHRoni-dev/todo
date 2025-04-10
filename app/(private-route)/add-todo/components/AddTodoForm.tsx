"use client";

import { useTodoAdd, useTodoDelete } from '@/app/feature/todo/todoQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTour } from '@reactour/tour';
import { useEffect, useState } from 'react';


export default function AddTodoForm() {

  const [title, setTitle] = useState('');
  const {isOpen, currentStep, setIsOpen, meta, setMeta } = useTour()

  const addTodo = useTodoAdd()
  const deleteTodo = useTodoDelete()
  const handleSubmit = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo.mutate({title});
    setTitle('');
  }

  useEffect(() => {
    const isTourDone = localStorage.getItem('tour') === 'done'
    if(!isTourDone) {
      localStorage.setItem('tour', "done")
      setIsOpen(true)
    }
  }, [setIsOpen])

  //< tour setup
  useEffect(() => {
    if(isOpen && currentStep === 1) {
      const text = "This is example todo from tour"
      let index = 0
      let intervalId :  NodeJS.Timeout | undefined ;
      // eslint-disable-next-line prefer-const
      intervalId = setInterval(() => {
        setTitle(text.slice(0, index++))
        if(index > text.length) {
          clearInterval(intervalId)
        }
      }, 100)
      return () => clearInterval(intervalId)
    }else if(isOpen && currentStep === 2 && title) {
      addTodo.mutate({title});
      setInterval(() => {
        setMeta?.(addTodo.data?.data._id)
      }, 100)
      setTitle('');
    }
    if(isOpen && currentStep === 1 && meta){
      deleteTodo.mutate({todoId: meta})
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentStep])
  const tourAddButtonClassName = isOpen && currentStep === 1 ? "animate-bounce" : ""
  //>
  

  return (
    <div className='flex items-center gap-2 flex-1 max-w-md'>
      <Input data-tour='add-todo-input' placeholder='Add todo' value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button onClick={handleSubmit}  data-tour='add-todo-button' className={cn(tourAddButtonClassName)}> Add </Button>
    </div>
  )
}


