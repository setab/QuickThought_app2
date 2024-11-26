import { Outlet } from "react-router-dom";
import NevBar from "./NevBar";



const MainLayout = () => {
    return (
        <div className="bg-black w-5/6 mx-auto pt-10">
            <div className="flex">
                <div className="w-1/5 "> < NevBar /></div>
                
                <div className="w-1/2 border-white border-x border-opacity-30">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;