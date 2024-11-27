import { useContext, useState } from "react";
import loginImg from "../assets/Login.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      {/* container */}
      <div className="flex h-full w-full">
        {/* Form Side */}
        <div className="flex w-full sm:w-1/2 items-center justify-center">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
            <div className="w-full mb-4">
              <h3 className="bold-36">{currState}</h3>
            </div>
            {currState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                />
              </div>
            )}
            <div className="w-full">
              <label htmlFor="email" className="medium-15">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="medium-15">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>
            <button className="btn-secondary w-full mt-5 !py-[9px]">
              {currState === "Sign Up" ? "Sign Up" : "Login"}
            </button>
            <div className="w-full flex flex-col gap-y-3">
              <div className="hover:underline medium-15 cursor-pointer">
                Forgot your password?
              </div>
              {currState === "Login" ? (
                <div className=" medium-15">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setCurrState("Sign Up")}
                    className="cursor-pointer hover:underline"
                  >
                    Create an account
                  </span>
                </div>
              ) : (
                <div className=" medium-15">
                  Already have an account?{" "}
                  <span
                    onClick={() => setCurrState("Login")}
                    className="cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
        {/* image side */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="" className="object-cover h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default Login;
