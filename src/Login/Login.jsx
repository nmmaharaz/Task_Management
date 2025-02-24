import { useContext } from "react";
import google from "../assets/google.png"
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const {GoogleSignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleGoogle = (e) => {
      e.preventDefault();
      try{
        GoogleSignIn();
        console.log("click korche")
        navigate("/")
      }catch(error){
        console.log(error, "click kore nai")
      }
    };
  
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full pt-12 max-w-md lg:max-w-xl mx-auto shrink-0">
          <form className="border-red-200 border rounded-2xl py-12 card-body">
            <button
              onClick={handleGoogle}
              className="btn bg-red-50 border-solid border-red-300 flex justify-between items-center"
            >
              <img className="w-8" src={google} alt="" />
              <p>Sign in with Google</p> <div></div>
            </button>
          </form>
        </div>
        </div>
    );
};

export default Login;