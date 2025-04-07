import { Todo } from '@/app/api/todo/schema'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Check, Delete, Pen, PenOff, } from 'lucide-react'
import { useState } from 'react'
import { useTodoDelete, useTodoUpdate } from '../feature/todo/todoQueries'
import { Card, CardContent } from '@/components/ui/card'
import Sortable from '@/components/dnd/SortableItem'

export default function TodoItem({ todo }: { todo: Todo }) {

  const [enabled, setEnabled] = useState(false)
  const [title, setTitle] = useState("")

  const updateTodo = useTodoUpdate();

  const deleteTodo = useTodoDelete();

  const handlePenClick = () => {
    setEnabled(enabled => !enabled)
    setTitle(todo.title)
  }

  const handleSubmit = () => {
    updateTodo.mutate({...todo, title})
    setEnabled(false)
  }

  const handleCancel = () => {
    setEnabled(false)
    setTitle("")
  }

  const handleDelete = () => {
    deleteTodo.mutate(todo._id)
  }

  const handleToggleCompleted = () => {
    updateTodo.mutate({...todo, completed: !todo.completed})
  }
  

  const isEditAble = () => !todo.completed && enabled

  if(todo.completed) {
    return <ShowTodoItem todo={todo} />
  }


  return (
    <Sortable id={todo._id} data={{todo, type: "todo"}}>
      <Card className='cursor-pointer'>
        <CardContent>
          <div key={todo._id} className='flex items-center gap-4' >
            <Checkbox  checked={todo.completed} onClick={handleToggleCompleted} onPointerDown={(e) => e.stopPropagation()}/>
            {
              enabled ? (
                <Input placeholder={todo.title} disabled={!isEditAble()} value={title} onChange={(e) => setTitle(e.target.value)} />
              ) : (
                <p className='w-full py-1.5'>{todo.title}</p>
              )
            }
            { !enabled ? (
                <div className='flex items-center gap-1'>
                  {!todo.completed && <Pen onClick={handlePenClick} onPointerDown={(e) => e.stopPropagation()}/> }
                  <Delete onClick={handleDelete} onPointerDown={(e) => e.stopPropagation()}/>
                </div>
              )
            : (
                <div className='flex items-center gap-1'>
                  <PenOff onClick={handleCancel} onPointerDown={(e) => e.stopPropagation()}/>
                  <Check onClick={handleSubmit} onPointerDown={(e) => e.stopPropagation()}/>
                </div>
              )
            }

          </div>
        </CardContent>
      </Card>
    </Sortable>
  )
}




function ShowTodoItem ({todo} : {todo: Todo,}) {

  const updateTodo = useTodoUpdate();

  const deleteTodo = useTodoDelete();

  const handleDelete = () => {
    deleteTodo.mutate(todo._id)
  }

  const handleToggleCompleted = () => {
    updateTodo.mutate({...todo, completed: !todo.completed})
  }
  

  return (
    <Sortable id={todo._id} data={{todo, type: "todo"}}>
      <Card className='cursor-pointer'>
        <CardContent>
          <div key={todo._id} className='flex items-center gap-4 w-full max-w-md ' >
            <Checkbox  checked={todo.completed} onClick={handleToggleCompleted} onPointerDown={(e) => e.stopPropagation()}/>
            <p className='line-through flex-1 py-1.5'>{todo.title}</p>
            <Delete onClick={handleDelete} onPointerDown={(e) => e.stopPropagation()}/>
          </div>
        </CardContent>
      </Card>
    </Sortable>
  )
}