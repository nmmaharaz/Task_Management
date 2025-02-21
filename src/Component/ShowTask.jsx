import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DragAndDropList = ({ Tasks }) => {
  // Ensure Tasks is an array before mapping
  const initialItems = Array.isArray(Tasks)
    ? Tasks.map((task) => ({ id: String(task._id), title: task.title || "Untitled Task" }))
    : [];

  const [items, setItems] = useState(initialItems);

  // Log tasks if they are undefined (debugging aid)
  useEffect(() => {
    if (!Tasks || !Array.isArray(Tasks)) {
      console.error("⚠️ Tasks is undefined or not an array:", Tasks);
    }
  }, [Tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return; // Prevent errors if dropped outside

    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      const newIndex = prevItems.findIndex((item) => item.id === over.id);
      
      return arrayMove(prevItems, oldIndex, newIndex);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Drag and Drop List</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="bg-white shadow-lg rounded-lg p-4 w-80">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      className="bg-blue-500 text-white p-3 my-2 rounded-md shadow-md cursor-grab active:cursor-grabbing"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      {item.title}
    </div>
  );
};

export default DragAndDropList;
