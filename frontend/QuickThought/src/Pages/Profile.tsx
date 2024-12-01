import axios from "axios";
import ProfilePic from "../components/ProfilePic";
import { useState, useEffect } from "react";

interface AboutUser {
  bio: string;
  id: number;
  user_id: number;
}

const Profile = () => {
  const [UserData, setUserData] = useState<AboutUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/aboutUser/userData", {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data.aboutUser[0]); // Directly set the first object
        setError(null); // Clear any error
      })
      .catch((err) => {
        console.error("Failed to load userData:", err);
        setUserData(null);
        setError("Failed to fetch user data.");
      })
      .finally(() => setIsLoading(false)); // Ensure loading state is set to false
  }, []);

  const bannerUrl = UserData
    ? `http://127.0.0.1:5000/api/uploadImage/getdp`
    : "https://via.placeholder.com/150"; // Fallback banner URL

  return (
    <div>
      {/* Navigation/Header Section */}
      <div className="py-4 bg-green-400 bg-opacity-30">Home</div>

      {/* Banner Section */}
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-20 mt-32 ml-6 rounded-full ring ring-offset-2">
            {/* Profile Picture */}
            {UserData && <ProfilePic userId={UserData.user_id} />}
          </div>
        </div>
      </div>

      {/* User Info */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="mt-4">
          <h2>{UserData?.bio}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
