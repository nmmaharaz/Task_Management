import { useContext } from "react";
import Login from "../Login/Login";
import { AuthContext } from "../AuthProvider/AuthProvider";
import TaskManage from "../Component/TaskManage";

const Home = () => {
    const {user, loading} = useContext(AuthContext)
    if(loading) return <p>loading...</p>
    return (
        <div>
            {
                user?.email ? <>
                <TaskManage></TaskManage>
                </>:<Login></Login>
            }
            
        </div>
    );
};

export default Home;