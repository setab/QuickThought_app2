import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Images/Logo.png";
import React, { useState } from "react";

const Signin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      navigate("/login");
    } catch (err: unknown) {
      setError((err as Error).message);
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

            <form onSubmit={handleSignIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span>Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-info text-white rounded-3xl"
                >
                  Create Account
                </button>
                <p className="text-xs font-light mt-4">
                  By signing up, you agree to the{" "}
                  <span className="text-blue-500">Terms of Service</span> and{" "}
                  <span className="text-blue-500">Privacy Policy</span>,
                  including <span className="text-blue-500">Cookie Use</span>.
                </p>
              </div>
              <div>
                <p className="text-lg mb-6 mt-8">Already have an account?</p>
                <Link
                  to="/login"
                  className="btn btn-outline btn-info w-full rounded-3xl"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
