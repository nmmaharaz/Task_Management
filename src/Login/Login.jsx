import { useContext } from "react";
import google from "../assets/google.png"
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const {SignIn, GoogleSignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.table(email, password);
      try {
        await SignIn(email, password);
        navigate("/")
      } catch (error) {
        alert("Eroor")
        console.log(error);
      }
    };
  
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
        <div>
            <div className="card bg-base-100 w-full pt-12 max-w-md mx-auto shrink-0">
          <form onSubmit={handleLogin} className="border-red-200 border rounded-2xl card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn w-full bg-red-600 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition">Login</button>
            </div>
            <div className="divider">Or</div>
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