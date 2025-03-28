import { Todo } from '@/app/api/todo/schema'
import { DragOverlay } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
export default function Sortable({id, data, children} : {id: string, data: {todo: Todo},children : React.ReactNode}) {

  const {attributes, listeners, transition, transform, setNodeRef, isDragging} = useSortable({id: id, data: data})

  

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{transform: CSS.Translate.toString(transform), transition, }}>
        {children}
    </div>
  )
}
