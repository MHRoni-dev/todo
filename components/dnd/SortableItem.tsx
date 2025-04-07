import { Todo } from '@/app/api/todo/schema'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
export default function Sortable({id, data, children} : {id: string, data: {todo?: Todo, type: string},children : React.ReactNode}) {

  const {attributes, listeners, transition, transform, setNodeRef, isDragging} = useSortable({id: id, data: data})

  

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{transform: CSS.Translate.toString(transform), transition}} className={`w-full ${isDragging ? "opacity-50 border border-black rounded-xl" : "opacity-100"} ${data.type === "container" ? "cursor-pointer" : "cursor-move"}`}>
        {children}
    </div>
  )
}
