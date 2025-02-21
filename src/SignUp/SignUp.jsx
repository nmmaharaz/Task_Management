import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import google from "../assets/google.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
    const navigate = useNavigate()
    const { GoogleSignIn, SignUp, userUpdateProfile, setUser } =
      useContext(AuthContext);
    const handleRegistration = async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      console.table(name, email, password);
      try {
        const result =await SignUp(email, password);
        setUser(result.user)
        userUpdateProfile({displayName:name})
          const employeeData = {
            name: name,
            email: email,
          };
          axios.post(
            `${import.meta.env.VITE_API_URL}/users`,
            employeeData
          );
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleGoogle = async(e) => {
      e.preventDefault();
     const {user} = await GoogleSignIn();
     const employeeData = {
        name: user.displayName,
        email: user.email,
      };
      axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        employeeData
      );
    //   const employeeData = {
    //     name: name,
    //     email: email,
    //   };
    //   axios.post(
    //     `${import.meta.env.VITE_API_URL}/users`,
    //     employeeData
    //   );
      navigate("/")
    };
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-md shrink-0 border border-red-200">
          <form onSubmit={handleRegistration} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
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
              <button className="btn w-full bg-red-600 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700 transition">Registration</button>
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

export default SignUp;