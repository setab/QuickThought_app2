import { GoHomeFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';

import logo from '../assets/Images/Logo.png'
import { CgProfile } from "react-icons/cg";

const NevBar = () => {
    return (
        <div>
              {/* Nav Bar */}
              <div className=''>
                <div className='flex flex-col gap-4'>
                    <img className='w-14' src={logo} alt="" />


                    <NavLink
                        to="/"
                        className="flex items-center gap-3 text-2xl  text-white hover:rounded-2xl hover:bg-blue-100 hover:bg-opacity-10 hover:w-fit px-2 py-1"
                    >
                        <GoHomeFill />
                        <p>HOME</p>
                    </NavLink>

                    <NavLink to='/profile' className='flex items-center gap-3 text-2xl font-semibold text-white hover:rounded-2xl hover:bg-blue-100 hover:bg-opacity-10 hover:w-fit px-2 py-1'>
                    <CgProfile />

                        <p>PROFILE</p>
                    </NavLink>

                </div>
            </div>
        </div>
    );
};

export default NevBar;