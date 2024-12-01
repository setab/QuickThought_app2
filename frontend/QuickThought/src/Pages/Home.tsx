import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import ProfilePic from "../components/ProfilePic";
import axios from "axios";

interface Thought {
  id: number;
  user_id: number;
  username: string;
  content: string;
  timestamp: string; // Use ISO date string
}

const Home = () => {
  const [thought, setThought] = useState(""); // Input state
  const [ThoughData, ThoughtSetData] = useState<Thought[]>([]); // Thought data
  const [UserData, setUserData] = useState<{ user_id: number } | null>(null); // User data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/thought/addThoughts",
        {
          // user_id: UserData?.user_id,
          content: thought,
        }
      );
      setThought(""); // Clear input
      ThoughtSetData((prev) => [response.data, ...prev]); // Add new thought
    } catch (err) {
      console.error("Failed to post thought:", err);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/thought/thoughts")
      .then((response) => ThoughtSetData(response.data.thoughts))
      .catch(() => setError("Failed to load thoughts."))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/auth/user_id", {
        withCredentials: true,
      })
      .then((response) => setUserData(response.data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      {/* Post Section */}
      <div className="flex flex-grow mb-8">
        <div className="avatar">
          <div className="w-14 rounded-full">
            {UserData && <ProfilePic userId={UserData.user_id} />}
          </div>
        </div>

        <form className="w-full" onSubmit={handlePost}>
          <input
            type="text"
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="Share your quick thoughts!!"
            className="input input-ghost w-full ml-6"
            required
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

      {/* News Feed */}
      <div>
        {isLoading ? (
          <p>Loading thoughts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : ThoughData.length > 0 ? (
          ThoughData.map((thoughtItem) => (
            <div key={thoughtItem.id} className="flex items-start gap-4 my-4">
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <ProfilePic userId={thoughtItem.user_id} />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {thoughtItem.username}
                  </h3>
                  <h3 className="text-sm text-gray-300">
                    {new Date(thoughtItem.timestamp).toLocaleString()}
                  </h3>
                </div>

                <p className="text-sm mt-2 opacity-80">{thoughtItem.content}</p>

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
