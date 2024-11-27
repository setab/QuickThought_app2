import { Link } from 'react-router-dom';
import logo from '../assets/Images/Logo.png';
import React from 'react';

const Signin = () => {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement; // Explicitly cast target to HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    console.log('Name:', name, 'Email:', email, 'Password:', password);
    form.reset(); // Optionally reset the form after submission
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
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  name="name" // Add name attribute for easier access
                  placeholder="Name"
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
                  name="email" // Add name attribute for easier access
                  placeholder="Email"
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
                  name="password" // Add name attribute for easier access
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-info text-white rounded-3xl">
                  Create Account
                </button>

                <p className="text-xs font-light mt-4">
                  By signing up, you agree to the{' '}
                  <span className="text-blue-500">Terms of Service</span> and{' '}
                  <span className="text-blue-500">Privacy Policy</span>, including{' '}
                  <span className="text-blue-500">Cookie Use</span>.
                </p>
              </div>

              <div>
                <p className="text-lg mb-6 mt-8">Already have an account?</p>
                <Link to ='/login' className="btn btn-outline btn-info w-full rounded-3xl">
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
