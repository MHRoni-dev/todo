"use client";
import React, { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";
import Sortable from '@/components/dnd/SortableItem';

function App() {
  const [containers, setContainers] = useState({
    container1: ["1", "2", "3"],
    container2: ["4", "5", "6"],
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(over,active)
  
    if (!over) return;
  
    const activeContainer = Object.keys(containers).find((key) =>
      containers[key].includes(active.id) 
    );
    const overContainer = Object.keys(containers).find((key) =>
      containers[key].includes(over.id) || over.id === key // Allow dropping into empty containers
    );
    console.log(overContainer,containers)
  
    if (!activeContainer || !overContainer) return;
  
    const activeIndex = containers[activeContainer].indexOf(active.id);
    const overIndex = containers[overContainer].indexOf(over.id);
  
    if (activeContainer === overContainer) {
      // Reorder within the same container
      setContainers((prev) => ({
        ...prev,
        [activeContainer]: arrayMove(
          prev[activeContainer],
          activeIndex,
          overIndex
        ),
      }));
    } else {
      // Move between containers
      setContainers((prev) => {
        const newItems = {
          ...prev,
          [activeContainer]: prev[activeContainer].filter(
            (item) => item !== active.id
          ),
          [overContainer]: [
            ...prev[overContainer].slice(0, overIndex),
            active.id,
            ...prev[overContainer].slice(overIndex),
          ],
        };
        return newItems;
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners}  onDragEnd={handleDragEnd} onDragMove={handleDragEnd}>
      <div style={{ display: "flex" }}>
        <SortableContainer id="container1" items={containers.container1} />
        <SortableContainer id="container2" items={containers.container2} />
      </div>
    </DndContext>
  );
}

export default App;

function SortableContainer({ id, items }) {
  return (
    <SortableContext id={id} items={items} >
      <Sortable
        id={id}
        data={id}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          margin: "10px",
          minHeight: "100px",
        }}
      >
        <h3>Container {id}</h3>
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </Sortable>
    </SortableContext>
  );
}

function SortableItem({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="draggable-item"
    >
      Item {id}
    </div>
  );
}