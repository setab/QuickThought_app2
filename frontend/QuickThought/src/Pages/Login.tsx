import logo from '../assets/Images/Logo.png'



const Login = () => {



    return (
        <div className='fira-sans pt-10'>
            <div className="hero min-h-screen">

                <div className="hero-content flex flex-col lg:flex-row">

                    <div className="text-center lg:text-left lg:w-1/2 mx-auto">
                        <img className='w-3/4' src={logo} alt="" />
                    </div>




                    <div className="card max-w-sm shrink-0 shadow-2xl lg:w-1/2 mx-auto text-white ">

                        <h1 className='text-5xl font-extrabold ml-8'>Quick Thought</h1>
                        <p className='text-3xl font-bold ml-8 mt-6'>Join today.</p>

                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered " required />
                                <label className="label">
                                    <a href="#" className=" link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-info text-white rounded-3xl">Log In</button>

                                <p className='text-xs font-light mt-4'>By signing up, you agree to the <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>, including <span className='text-blue-500'>Cookie Use</span>.</p>
                            </div>

                         <div>
                            <p className='text-lg mb-6 mt-8'>Don't have an account?</p>
                            <button className="btn btn-outline btn-info w-full rounded-3xl">Sign up</button>
                         </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
