import { CiLocationOn } from 'react-icons/ci';
import Banner from '../assets/Images/Banner.png';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Profile = () => {
    const openModal = () => {
        const modal = document.getElementById('my_modal_3');
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    };

    return (
        <div>
            <div>
               
                <div className="px-4 pb-4 bg-black bg-opacity-20 w-full flex items-center">
                 
                    <Link to='/' className="text-3xl">
                        <IoArrowBackOutline />
                    </Link>
                </div>

                {/* Banner Section */}
                <div
                    className="h-52 bg-cover bg-center"
                    style={{ backgroundImage: `url(${Banner})` }}
                >
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-28 mt-36 ml-6 rounded-full ring ring-offset-2">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="User Avatar"
                            />
                        </div>
                    </div>
                </div>

                {/* Name and details */}
                <div className='mt-20 p-5 flex justify-between'>
                    <div className='space-y-2'>
                        <p className='font-bold text-2xl'>Soad As Hamim Mahi</p>
                        <p className='text-base'>I am a student</p>
                        <div className='text-base flex gap-2 items-center opacity-70'>
                            <CiLocationOn />
                            <p>Dhaka, Bangladesh</p>
                        </div>

                        <div className='flex gap-7'>
                            <p className='text-gray-400'><span className='text-white'>21</span> Following</p> 
                            <p className='text-gray-400'><span className='text-white'>21</span> Follower</p> 

                        </div>
                    </div>

                    <div>
                        {/* You can open the modal using the openModal function */}
                        <button className="btn btn-outline rounded-3xl" onClick={openModal}> Edit Profile</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box bg-black opacity-90">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg mb-6">Edit Profile</h3>
                                <form action="">
                                    <label className="input input-bordered flex items-center gap-2 mt-2">
                                        Name
                                        <input type="text" className="grow" placeholder="" />
                                    </label>

                                    <label className="input input-bordered flex items-center gap-2 mt-2">
                                        bio
                                        <input type="text" className="grow" placeholder="" />
                                    </label>

                                    <label className="input input-bordered flex items-center gap-2 mt-2">
                                        Location
                                        <input type="text" className="grow" placeholder="" />
                                    </label>
                                </form>
                            </div>
                        </dialog>
                    </div>

                </div>


                <div className='p-4'>
                    <p>Posts</p>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Profile;
