import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/Images/Logo.png";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null); // Error state for invalid login
  const navigate = useNavigate(); // Used to navigate after successful login

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      // Send login request to the backend
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include session cookie in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      // If successful, navigate to the home page
      navigate("/");
    } catch (err: unknown) {
      setError((err as Error).message); // Display error message
    }
  };

  return (
    <div className="fira-sans pt-10">
      <div className="hero min-h-screen">
        <div className="hero-content flex flex-col lg:flex-row">
          <div className="text-center lg:text-left lg:w-1/2 mx-auto">
            <img className="w-3/4" src={logo} alt="Logo" />
          </div>

          <div className="card max-w-sm shrink-0 shadow-2xl lg:w-1/2 mx-auto text-white">
            <h1 className="text-5xl font-extrabold ml-8">Quick Thought</h1>
            <p className="text-3xl font-bold ml-8 mt-6">Join today.</p>

            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span>User Name</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="User name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-2">
                  {error} {/* Show error message */}
                </div>
              )}

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-info text-white rounded-3xl"
                >
                  Log In
                </button>

                <p className="text-xs font-light mt-4">
                  By signing up, you agree to the{" "}
                  <span className="text-blue-500">Terms of Service</span> and{" "}
                  <span className="text-blue-500">Privacy Policy</span>,
                  including <span className="text-blue-500">Cookie Use</span>.
                </p>
              </div>

              <div>
                <p className="text-lg mb-6 mt-8">Don't have an account?</p>
                <Link
                  to="/signin"
                  className="btn btn-outline btn-info w-full rounded-3xl"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
