import React, { useEffect, useState } from "react";
import axios from "axios";

interface LikeCountProps {
  thoughtId: number;
}

const LikeCount: React.FC<LikeCountProps> = ({ thoughtId }) => {
  const [likeCount, setLikeCount] = useState<number | null>(null); // To store the number of likes
  const [error, setError] = useState<string | null>(null); // To store any error message

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        // Replace with your API endpoint that returns the like count
        const response = await axios.get(
          `http://127.0.0.1:5000/api/reaction/getlike/${thoughtId}`
        );
        setLikeCount(response.data.likes); // Set the like count from the API response
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Failed to fetch like count.");
        console.error(err);
      }
    };

    fetchLikeCount();
  }, [thoughtId]); // Only run when the thoughtId changes

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : likeCount !== null ? (
        <p>Likes: {likeCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LikeCount;
