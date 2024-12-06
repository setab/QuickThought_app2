import { useState, useEffect } from "react";
import ProfilePic from "../components/ProfilePic";
import axios from "axios";
import LikeButton from "../components/LikeButton";

interface Thought {
  id: number;
  user_id: number;
  username: string;
  content: string;
  timestamp: string; // Use ISO date string
}

interface Like {
  thought_id: number;
}

const Home = () => {
  const [thought, setThought] = useState(""); // Input state
  const [thoughtData, setThoughtData] = useState<Thought[]>([]); // Thought data
  const [userData, setUserData] = useState<{ user_id: number } | null>(null); // User data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [seed, setSeed] = useState(1); // Seed state for triggering re-render
  const [likes, setLikes] = useState<number[]>([]); // Array of liked thought IDs

  const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/thought/addThoughts",
        { content: thought },
        { withCredentials: true }
      );
      console.log(response.data);

      // After posting, update the seed to trigger re-fetch
      setSeed(Math.random());
      setThought(""); // Clear the input
    } catch (err) {
      console.error("Failed to post thought:", err);
    }
  };

  useEffect(() => {
    // Fetch all thoughts
    axios
      .get("http://127.0.0.1:5000/api/thought/thoughts")
      .then((response) =>
        setThoughtData(
          response.data.thoughts.sort(
            (a: Thought, b: Thought) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        )
      )
      .catch(() => setError("Failed to load thoughts."))
      .finally(() => setIsLoading(false));
  }, [seed]); // Re-fetch thoughts when seed changes

  useEffect(() => {
    // Fetch current user data
    axios
      .get("http://127.0.0.1:5000/api/auth/user_id", {
        withCredentials: true,
      })
      .then((response) => setUserData(response.data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  useEffect(() => {
    // Fetch user's likes
    console.log("Fetching user likes...");
    axios
      .get("http://127.0.0.1:5000/api/reaction/get_user_likes", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response Data:", response.data); // Log the full response for debugging

        // Access likes properly from the nested "data" key
        if (response.data.success && response.data.data.likes) {
          console.log("Likes fetched:", response.data.data.likes); // Log the likes array
          setLikes(
            response.data.data.likes.map((like: Like) => like.thought_id)
          ); // Extract thought IDs
        } else {
          console.log("No likes found");
          setLikes([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user likes:", err);
        setError("Failed to load user likes.");
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto">
      {/* Post Section */}
      <div className="flex flex-grow mb-8">
        <div className="avatar">
          <div className="w-14 rounded-full">
            {userData && <ProfilePic userId={userData.user_id} />}
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
        ) : thoughtData.length > 0 ? (
          thoughtData.map((thoughtItem) => (
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
                    <LikeButton
                      thoughtId={thoughtItem.id}
                      initialUserLiked={likes.includes(thoughtItem.id)}
                      // Check if the user already liked this thought
                    />
                    <div>
                      {/* {likes.includes(thoughtItem.id)},{thoughtItem.id} */}
                    </div>
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
