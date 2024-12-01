import { CiLocationOn } from 'react-icons/ci';
import Banner from '../assets/Images/Banner.png';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLike } from 'react-icons/ai';
import ProfilePic from '../components/ProfilePic';

interface AboutUser {
  bio: string;
  id: number;
  user_id: number;
  location: string;
  name: string;
  followers: number;
  following: number;
}

const Profile = () => {
  const [userData, setUserData] = useState<AboutUser | null>(null);
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

  const bannerUrl = userData
    ? `http://127.0.0.1:5000/api/uploadImage/getdp`
    : Banner; // Fallback banner URL

  const openModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <div>
      <div>
        {/* Navigation/Header Section */}
        <div className="px-4 pb-4 bg-black bg-opacity-20 w-full flex items-center">
          <Link to='/' className="text-3xl">
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
              <img
                src={userData ? `http://127.0.0.1:5000/api/uploadImage/getProfilePic` : "https://via.placeholder.com/150"}
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        {/* Name and Details */}
        {isLoading ? (
          <p className="text-center mt-10 text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-500">{error}</p>
        ) : (
          <div className='mt-20 p-5 flex justify-between'>
            <div className='space-y-2'>
              <p className='font-bold text-2xl'>{userData?.name}</p>
              <p className='text-base'>{userData?.bio || "No bio available"}</p>
              <div className='text-base flex gap-2 items-center opacity-70'>
                <CiLocationOn />
                <p>{userData?.location || "No location provided"}</p>
              </div>

              <div className='flex gap-7'>
                <p className='text-gray-400'><span className='text-white'>{userData?.following || 0}</span> Following</p>
                <p className='text-gray-400'><span className='text-white'>{userData?.followers || 0}</span> Followers</p>
              </div>
            </div>

            <div>
              {/* Edit Profile Modal */}
              <button className="btn btn-outline rounded-3xl" onClick={openModal}>Edit Profile</button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-black opacity-90">
                  <form method="dialog">
                    {/* Close Button */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg mb-6">Edit Profile</h3>
                  <form>
                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      Name
                      <input type="text" className="grow" defaultValue={userData?.name || ""} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      Bio
                      <input type="text" className="grow" defaultValue={userData?.bio || ""} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-2">
                      Location
                      <input type="text" className="grow" defaultValue={userData?.location || ""} />
                    </label>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        )}

        {/* Posts Section */}
        <div className="p-4">
  <p className="text-lg text-white font-bold">Posts</p>
  <hr className="border-gray-700" />

  <div>
    {/* Static posts representation */}
    <div className="flex items-start gap-4 my-4">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Username</h3>
          <h3 className="text-sm text-gray-300">Nov 27, 2024, 10:30 AM</h3>
        </div>

        <p className="text-sm mt-2 opacity-80">
          This is a sample post content to showcase the UI design.
        </p>

        <div className="flex gap-10 mt-4">
          <div className="flex items-center gap-2">
            <AiOutlineLike />
            <p>57</p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-4 my-4">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Another User</h3>
          <h3 className="text-sm text-gray-300">Nov 27, 2024, 11:45 AM</h3>
        </div>

        <p className="text-sm mt-2 opacity-80">
          This is another example post to illustrate multiple entries.
        </p>

        <div className="flex gap-10 mt-4">
          <div className="flex items-center gap-2">
            <AiOutlineLike />
            <p>34</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Profile;
