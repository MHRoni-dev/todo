"use client";

import { useTodoAdd } from '@/app/feature/todoQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';


export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const addTodo = useTodoAdd()
  const handleSubmit = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo.mutate({title});
    setTitle('');
  }

  return (
    <div className='flex items-center gap-2 flex-1 max-w-md'>
      <Input placeholder='Add todo' value={title} onChange={(e) => setTitle(e.target.value)} disabled={addTodo.isPending}/>
      <Button onClick={handleSubmit} disabled={addTodo.isPending}> Add </Button>
    </div>
  )
}
