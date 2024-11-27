import Banner from '../assets/Images/Banner.png';

const Profile = () => {
    return (
        <div>
            <div>
                {/* Navigation/Header Section */}
                <div className="py-4 bg-green-400 bg-opacity-30 fixed ">
                    Home
                </div>

                {/* Banner Section */}
                <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${Banner})` }}
                >
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-28 mt-32 ml-6 rounded-full ring ring-offset-2">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="User Avatar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
