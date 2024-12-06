import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import axios from "axios";

interface LikeButtonProps {
  thoughtId: number; // ID of the thought
  initialUserLiked: boolean; // Whether the user has already liked the thought
}

const LikeButton: React.FC<LikeButtonProps> = ({
  thoughtId,
  initialUserLiked,
}) => {
  const [likeCount, setLikeCount] = useState<number>(0); // Default to 0 instead of null
  const [liked, setLiked] = useState<boolean>(initialUserLiked); // Initialize like state based on initialUserLiked
  const [error, setError] = useState<string | null>(null); // To store any error message

  // Fetch initial like count when the component mounts
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/reaction/getlike/${thoughtId}`
        );

        // Check if the response data is correctly structured
        if (
          response.data.success &&
          response.data.data &&
          typeof response.data.data.likes === "number"
        ) {
          setLikeCount(response.data.data.likes); // Correctly set the like count
        } else {
          setError("Failed to fetch like count.");
          console.error("Invalid like count:", response.data);
        }
      } catch (err) {
        setError("Failed to fetch like count.");
        console.error(err);
      }
    };

    fetchLikeCount();
  }, [thoughtId]);

  // Handle toggling the like status
  const handleLikeToggle = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/reaction/like`,
        { thought_id: thoughtId },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Toggle the liked state
        setLiked((prev) => !prev);

        // Update like count locally based on the liked state
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      } else {
        console.error("Failed to toggle like:", response.data.message);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      setError("Failed to update like status.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Like Button */}
      <button
        onClick={handleLikeToggle}
        className={`flex items-center gap-2 px-2 py-1 rounded transition ${
          liked ? "bg-blue-500 text-white" : "text-gray-500 hover:text-blue-500"
        }`}
      >
        {liked ? <AiFillLike /> : <AiOutlineLike />}{" "}
        {/* Active/inactive icon */}
        <span>{liked ? "Liked" : "Like"}</span>
      </button>

      {/* Display Like Count */}
      <div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : likeCount !== null ? (
          <p>
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
