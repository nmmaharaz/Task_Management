import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import TimeAgo from "react-timeago";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TaskManage from "./TaskManage";
const socket = io("http://localhost:5000");

const ItemType = "TASK";

const Task = ({ task, reset }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Task deleted");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`);
      console.log("Task deleted successfully");
      reset()
      setIsDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const updateData = { title, description };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/task/${task._id}`,
        updateData
      );
      setIsEditing(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border border-red-100 m-2 bg-white rounded shadow cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {isEditing || isDelete ? (
        isEditing? (
          <form onSubmit={handleUpdate} className="rounded-2xl ">
          <div className=" mb-2 form-control">
            <input
              type="text"
              name="title"
              defaultValue={task?.title}
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <textarea
              type="text"
              defaultValue={task?.description}
              name="description"
              placeholder="Description"
              className="input min-h-9 input-bordered"
              required
            />
          </div>
          <div className="form-control mt-2">
            <div className="flex space-x-2 justify-between items-center">
              <button
                type="submit"
                className="bg-green-500 py-1 rounded-lg w-full text-white font-semibold"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                type="submit"
                className="border border-base-300 py-1 rounded-lg text-black w-full font-semibold"
              >
                Cencel
              </button>
            </div>
          </div>
        </form>
        ):(
          <form className="rounded-2xl ">
          <div className=" mb-2 form-control">
            <p className="font-bold text-center">Are you sure you want to delete this task?</p>
          </div>
        
          <div className="form-control mt-2">
            <div className="flex space-x-2 justify-between items-center">
              <button
              onClick={handleDelete}
                type="submit"
                className="bg-green-500 py-1 rounded-lg w-full text-white font-semibold"
              >
                Yes
              </button>
              <button
                onClick={() => setIsDelete(false)}
                type="submit"
                className="border border-base-300 py-1 rounded-lg text-black w-full font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </form>
        )
       
      ) : (
        <div>
          <p className="text-[18px] font-semibold">{task?.title}</p>
          <p>{task?.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <p>
                <TimeAgo date={new Date(task.time)} />
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-[#5fa1c0] px-3 py-1 mr-3 rounded-sm hover:bg-[#49839d]"
              >
                <FaRegEdit className="text-xl text-white" />
                <p className="text-white">Edit</p>
              </button>

              <button
              onClick={()=>setIsDelete(true)}
                className="flex items-center bg-[#e54424] px-3 py-1 mr-3 rounded-sm hover:bg-[#c63517]"
              >
                <MdOutlineDelete className="text-xl text-white" />
                <p className="text-white">Delete</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Column = ({ title, tasks, category, moveTask, reset }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => moveTask(item.id, category),
  }));

  return (
    <div
      ref={drop}
      className="lg:w-1/3 border dark:border-gray-800 border-red-100 p-4 dark:bg-gray-950 bg-gray-100 rounded-md min-h-[200px]"
    >
      <h2 className="text-lg font-bold dark:text-white mb-2">{title}</h2>
      {tasks.map((task) => (
        <Task key={task._id} reset={reset} task={task} />
      ))}
    </div>
  );
};

const TaskBoard = ({reset, Tasks, setTasks, tasks}) => {
  
  console.log("TaskBoard rerendered", tasks);

  useEffect(() => {
    socket.on("taskUpdated", setTasks);
    return () => socket.off("taskUpdated");
  }, [setTasks]);
  const moveTask = (taskId, newCategory) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, category: newCategory } : task
      )
    );

    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCategory }),
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="lg:flex dark:bg-black gap-4 justify-around p-4">
        <Column
          title="To-Do"
          category="To-Do"
          tasks={tasks.filter((t) => t.category === "To-Do")}
          moveTask={moveTask}
          reset={reset}
        />
        <Column
          title="In Progress"
          category="In Progress"
          tasks={tasks.filter((t) => t.category === "In Progress")}
          moveTask={moveTask}
          reset={reset}
        />
        <Column
          title="Done"
          category="Done"
          tasks={tasks.filter((t) => t.category === "Done")}
          moveTask={moveTask}
          reset={reset}
        />
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
