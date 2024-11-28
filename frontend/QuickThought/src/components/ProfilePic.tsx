import React, { useEffect, useState } from "react";

interface ProfilePicProps {
  userId: number;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ userId }) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");

  useEffect(() => {
    // Construct the API URL
    const apiUrl = `http://127.0.0.1:5000/api/uploadImage/getpp/${userId}`;
    setProfilePicUrl(apiUrl);
  }, [userId]);

  return (
    <div>
      <img
        src={profilePicUrl}
        alt="User Profile"
        onError={(e) => {
          e.currentTarget.src =
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"; // Fallback image
        }}
        style={{
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
};

export default ProfilePic;
