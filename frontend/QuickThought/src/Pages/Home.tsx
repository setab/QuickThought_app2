import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import ProfilePic from "../components/ProfilePic";
import axios from "axios";

const Home = () => {
  const [thought, setThought] = useState(""); // State to manage the input value
  const [ThoughData, ThoughtSetData] = useState<any[]>([]); // State to store thought data

  // Handle form submission
  const handlePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    console.log("Posted Thought:", thought); // Log the input value
    setThought(""); // Clear the input field after posting
  };

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/thought/thoughts")
      .then((response) => {
        ThoughtSetData(response.data.thoughts); // Set thought data from the API
      })
      .catch((error) => console.error(error));
  }, []); // Only run once when the component mounts
  console.log(ThoughData);

  return (
    <div className="w-11/12 mx-auto">
      {/* Post Part */}
      <div className="flex flex-grow mb-8">
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
          <button
            type="submit"
            className="btn btn-info text-white rounded-2xl ml-5"
          >
            Post
          </button>
        </form>
      </div>

      <hr className="my-8" />

      {/* News Feed Part */}
      <div>
        {ThoughData.length > 0 ? (
          ThoughData.map((thoughtItem: any) => (
            <div key={thoughtItem.id} className="flex items-start gap-4 my-4">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <ProfilePic userId={thoughtItem.user_id} />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col w-full">
                {/* Name and Date */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {thoughtItem.username}
                  </h3>
                  <h3 className="text-sm text-gray-300">
                    {new Date(thoughtItem.timestamp).toLocaleString()}
                  </h3>
                </div>

                {/* Thought Content */}
                <p className="text-sm mt-2 opacity-80">{thoughtItem.content}</p>

                {/* Like Button */}
                <div className="flex gap-10 mt-4">
                  <div className="flex items-center gap-2">
                    <AiOutlineLike />
                    <p>57</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No thoughts to display</p>
        )}
      </div>
    </div>
  );
};

export default Home;
