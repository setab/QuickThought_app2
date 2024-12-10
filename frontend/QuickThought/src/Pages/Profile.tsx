import { CiLocationOn } from "react-icons/ci";
import Banner from "../assets/Images/Banner.png";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import { AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import ProfilePic from "../components/ProfilePic";
import LikeButton from "../components/LikeButton";
import UploadImgButton from "../components/UploadImgButton";
interface AboutUser {
  bio: string;
  id: number;
  user_id: number;
  location: string;
  username: string;
  followers: number;
  following: number;
}

interface Thoughts {
  content: string;
  id: number;
  timestamp: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<AboutUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [UserThoughts, setUserThoughts] = useState<Thoughts[]>([]);
  const [likes, setLikes] = useState<number[]>([]);

  // Fetch user data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/aboutUser/userData", {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data.aboutUser[0]);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load userData:", err);
        setUserData(null);
        setError("Failed to fetch user data.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch and sort user thoughts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/thought/userthoughts", {
        withCredentials: true,
      })
      .then((response) => {
        const sortedThoughts = response.data.thoughts.sort(
          (a: Thoughts, b: Thoughts) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setUserThoughts(sortedThoughts);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load user thoughts:", err);
        setUserThoughts([]);
        setError("Failed to fetch user thoughts.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch user likes
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/reaction/get_user_likes", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success && response.data.data.likes) {
          setLikes(
            response.data.data.likes.map((like: any) => like.thought_id)
          );
        } else {
          setLikes([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user likes:", err);
        setError("Failed to load user likes.");
      });
  }, []);

  // Delete a thought
  const handleDeleteThought = (thoughtId: number) => {
    axios
      .delete(`http://127.0.0.1:5000/api/thought/delete/${thoughtId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setUserThoughts((prevThoughts) =>
            prevThoughts.filter((thought) => thought.id !== thoughtId)
          );
        } else {
          alert("Failed to delete the thought.");
        }
      })
      .catch((err) => {
        console.error("Error deleting thought:", err);
        alert("An error occurred while deleting the thought.");
      });
  };

  const bannerUrl = userData
    ? `http://127.0.0.1:5000/api/uploadImage/getdp`
    : Banner;

  const openModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <div>
      <div>
        {/* Navigation/Header Section */}
        <div className="px-4 pb-4 bg-black bg-opacity-20 w-full flex items-center">
          <Link to="/" className="text-3xl">
            <IoArrowBackOutline />
          </Link>
        </div>

        {/* Banner Section */}
        <div
          className="h-52 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-28 mt-36 ml-6 rounded-full ring ring-offset-2">
              {userData && <ProfilePic userId={userData.user_id} />}
            </div>
          </div>
        </div>

        {/* Name and Details */}
        {isLoading ? (
          <p className="text-center mt-10 text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-500">{error}</p>
        ) : (
          <div className="mt-20 p-5 flex justify-between">
            <div className="space-y-2">
              <p className="font-bold text-2xl">{userData?.username}</p>
              <p className="text-base">{userData?.bio || "No bio available"}</p>
              <div className="text-base flex gap-2 items-center opacity-70">
                <CiLocationOn />
                <p>{userData?.location || "No location provided"}</p>
              </div>

              <div className="flex gap-7">
                <p className="text-gray-400">
                  <span className="text-white">{userData?.following || 0}</span>{" "}
                  Following
                </p>
                <p className="text-gray-400">
                  <span className="text-white">{userData?.followers || 0}</span>{" "}
                  Followers
                </p>
              </div>
            </div>

            <div>
              {/* Edit Profile Modal */}
              <button
                className="btn btn-outline rounded-3xl"
                onClick={openModal}
              >
                Edit Profile
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-black opacity-90">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg mb-6">Edit Profile</h3>
                  <form>
                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      Name
                      <input
                        type="text"
                        className="grow"
                        defaultValue={userData?.username || ""}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      Bio
                      <input
                        type="text"
                        className="grow"
                        defaultValue={userData?.bio || ""}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      Location
                      <input
                        type="text"
                        className="grow"
                        defaultValue={userData?.location || ""}
                      />
                    </label>
                    {/* Profile Picture Upload */}
                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      <span>Upload Banner</span>
                      <UploadImgButton uploadType="dp" />
                    </label>

                    {/* Banner Upload */}
                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      <span>Upload Profile Picture</span>
                      <UploadImgButton uploadType="pp" />
                    </label>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        )}

        {/* Posts Section */}
        <div>
          {isLoading ? (
            <p>Loading thoughts...</p>
          ) : error ? (
            <p>{error}</p>
          ) : UserThoughts.length > 0 ? (
            UserThoughts.map((thoughtItem) => (
              <div key={thoughtItem.id} className="flex items-start gap-4 my-4">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    {userData && <ProfilePic userId={userData?.user_id} />}
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      {userData?.username}
                    </h3>
                    <h3 className="text-sm text-gray-300">
                      {new Date(thoughtItem.timestamp).toLocaleString()}
                    </h3>
                  </div>

                  <p className="text-sm mt-2 opacity-80">
                    {thoughtItem.content}
                  </p>

                  <div className="flex gap-10 mt-4">
                    <div className="flex items-center gap-2">
                      <LikeButton
                        thoughtId={thoughtItem.id}
                        initialUserLiked={likes.includes(thoughtItem.id)}
                      />
                      <div>{thoughtItem.id}</div>
                    </div>
                    <div
                      className="flex items-center gap-2 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteThought(thoughtItem.id)}
                    >
                      {/* <AiOutlineDelete /> */}
                      <span>Delete</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-6 text-gray-400">
              You haven't shared any thoughts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
