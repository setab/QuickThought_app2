import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
// import { BiRepost } from "react-icons/bi";
// import { FaRegComment } from "react-icons/fa";

const Home = () => {
    const [thought, setThought] = useState(""); // State to manage the input value

    // Handle form submission
    const handlePost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
        console.log("Posted Thought:", thought); // Log the input value
        setThought(""); // Clear the input field after posting
    };

    return (
        <div className="w-11/12 mx-auto">
            {/* Post Part */}
            <div className="flex flex-grow">
                <div>
                    <div className="avatar">
                        <div className="w-14 rounded-full">
                            <img
                                className="w-14"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="User Avatar"
                            />
                        </div>
                    </div>
                </div>

                <form className="w-full" onSubmit={handlePost}>
                    <input
                        type="text"
                        value={thought} // Bind input to state
                        onChange={(e) => setThought(e.target.value)} // Update state on change
                        placeholder="Share your quick thoughts!!"
                        className="input input-ghost w-full ml-6"
                        required // Make the input field required
                    />
                    <hr className="my-5 ml-5" />
                    <button type="submit" className="btn btn-info text-white rounded-2xl ml-5">
                        Post
                    </button>
                </form>
            </div>

            <hr className="my-8" />

            {/* News feed part */}
            <div>
                <div className="flex items-start gap-4 my-4">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="w-14 rounded-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="Avatar"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        {/* Name and Date */}
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Saidul Islam Setab</h3>
                            <h3 className="text-sm text-gray-300">15 Nov 2025</h3>
                        </div>

                        {/* Comment */}
                        <p className="text-sm mt-2 opacity-80">
                            End Of The World Alert! The Biden Administration Is Proposing The Transfer Of Nuclear Weapons To Ukraine To Be Used Against Russia! This Constitutes The Largest & Most Dangerous Nuclear Escalation In History!
                        </p>

                        <div className="flex gap-10 mt-4">
                            {/* Uncomment these when needed */}
                            {/* <div className="flex items-center gap-2">
                                <FaRegComment />
                                <p>29</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <BiRepost />
                                <p>54</p>
                            </div> */}

                            <div className="flex items-center gap-2">
                                <AiOutlineLike />
                                <p>57</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
