import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function Dropable({id, items, children} : {id: string, items: {id : string}[], children : React.ReactNode}) {

  const {setNodeRef} = useDroppable({id: id})

  

  return (
    <div ref={setNodeRef}  >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  )
}
