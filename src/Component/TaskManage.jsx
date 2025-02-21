import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import TimeAgo from "react-timeago";
import ShowTask from "./ShowTask";
const TaskManage = () => {
  const time = new Date();
  const [category, setCategory] = useState("");
  const [Errormsg, setError] = useState(false);
  const [Errordes, setErrordes] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: Tasks, refetch: reset } = useQuery({
    queryKey: ["Tasks"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/tasks`
      );
      setLoading(false);
      return data;
    },
  });
console.log(Tasks)

  const handleTaskSubmit = async(e)=>{
    e.preventDefault();
    const Title = e.target.Title.value
    if (Title.length > 50) {
        setError(true)
        return
      }
    const description = e.target.description.value
     if (description.length > 200) {
        setErrordes(true)
        return
      }
    const TaskData ={
        title: Title,
        description,
        time,
        category,
    }
    try{
        axios.post(
            `${import.meta.env.VITE_API_URL}/tasks`,
            TaskData
          );
          reset()
    }catch{
        console.log("error")
    }
  }

  return (
    <div className="pt-4">
      <div className="card mx-auto bg-base-100 w-full max-w-md shrink-0 border border-red-200">
        <form
          onSubmit={handleTaskSubmit}
          className="border-red-200 border rounded-2xl card-body"
        >
          <h2 className="mb-4 text-orange-600 text-center text-3xl font-bold">
            Task Management App
          </h2>
          <p className="text-orange-600 font-semibold text-xl">Add New Task</p>
          <div className="form-control mb-3">
            <input
              type="text"
              name="Title"
              placeholder="Title"
              className="input input-bordered"
              required
            />
           <div>
            
                {Errormsg && <p className="text-red-500 mt-1">Title Maximum 50 latter</p>}
            
           </div>
          </div>
          <div className="form-control mb-3">
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              className="input h-28 input-bordered"
              required
            />
            {Errordes && <p className="text-red-500 mt-1">Description Maximum 200 latter</p>}
          </div>
          <label className="form-control w-full ">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered"
            >
              <option value="" disabled selected>
                Pick one
              </option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>
          {/* 
          <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          onClick={() => setTime(timestamp())}
        >
          Get New Timestamp
        </button>
        {time} */}

          <div>
            <p>
              Last updated: <TimeAgo date={new Date()} />
            </p>
          </div>

          <div className="form-control mt-6">
            <button className="btn w-full bg-orange-600 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-orange-700 transition">
              Add Task
            </button>
          </div>
          <p className="text-orange-600 px-8 pt-4 font-semibold text-xl">Task List</p>
        <ShowTask Tasks={Tasks} reset={reset}></ShowTask>
        </form>
        
      </div>
    </div>
  );
};

export default TaskManage;
