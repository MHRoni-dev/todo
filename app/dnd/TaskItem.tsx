import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
  };
  index: number;
  columnId: string;
}

const TaskItem = ({ task, index, columnId }: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: task.id,
    data: { columnId },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 rounded-md shadow-md mb-2 ${isDragging ? 'opacity-50' : ''}`}
      style={{ transform: isDragging ? CSS.Transform.toString({ scale: 1.1 }) : undefined }}
    >
      {task.title}
    </div>
  );
};

export default TaskItem;
