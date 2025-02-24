import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import TaskBoard from "./ShowTask";
import Navbar from "./Navbar";
import { AuthContext } from "../AuthProvider/AuthProvider";

const TaskManage = () => {
  const {user} = useContext(AuthContext);
  const time = new Date();
  const [category, setCategory] = useState("");
  const [Errormsg, setError] = useState(false);
  const [Errordes, setErrordes] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { data: Tasks, refetch: reset } = useQuery({
    queryKey: ["Task"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(data);
      return data;
    },
  });

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const Title = e.target.Title.value;
    if (Title.length > 50) {
      setError(true);
      return;
    }
    const description = e.target.description.value;
    if (description.length > 200) {
      setErrordes(true);
      return;
    }
    const TaskData = {
      title: Title,
      description,
      email: user?.email,
      time,
      category,
    };
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/tasks`, TaskData);
      reset();
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="dark:bg-black">
      <Navbar></Navbar>
      <div className="card mx-auto ">
        <form
          onSubmit={handleTaskSubmit}
          className="card-body border m-4 dark:border-gray-800 border-red-100 dark:bg-gray-950 bg-gray-100 rounded-md"
        >
          <div className="lg:flex lg:space-x-4 justify-between">
            <div className="mb-3 lg:mb-0 lg:w-1/4">
              <input
                type="text"
                name="Title"
                placeholder="Title"
                className="input w-full input-bordered"
                required
              />
              <div>
                {Errormsg && (
                  <p className="text-red-500 mt-1">Title Maximum 50 latter</p>
                )}
              </div>
            </div>
            <div className="mb-3 lg:mb-0 lg:w-2/4">
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                className="input w-full input-bordered"
                required
              />
              {Errordes && (
                <p className="text-red-500 mt-1">
                  Description Maximum 200 latter
                </p>
              )}
            </div>
            <label className="form-control w-full lg:w-1/4 ">
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
            <button className="btn mt-3 lg:mt-0 bg-[#e54424] text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-orange-700 transition">
              Add Task
            </button>
          </div>
        </form>
      </div>
      <TaskBoard
        tasks={tasks}
        setTasks={setTasks}
        Tasks={Tasks}
        reset={reset}
      ></TaskBoard>
    </div>
  );
};

export default TaskManage;
