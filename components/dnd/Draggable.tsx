import { Todo } from '@/app/api/todo/schema'
import { useDraggable } from "@dnd-kit/core"
export default function Draggable({id, data, children} : {id: string, data: Todo,children : React.ReactNode}) {

  const {attributes, listeners, transform, setNodeRef} = useDraggable({id: id, data: data})

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className=''>
      {children}
    </div>
  )
}
