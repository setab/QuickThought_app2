import { Outlet } from "react-router-dom";
import NevBar from "./NevBar";
import Follower from "./Follower";

const MainLayout = () => {
  return (
    <div className="bg-black w-5/6 mx-auto pt-10 flex">
      {/* Fixed NevBar */}
      <div className="w-1/5 fixed h-screen">
        <NevBar />
      </div>

      {/* Scrollable Outlet Area */}
      <div className="w-3/5 ml-[20%] mr-[20%] border-white border-x border-opacity-30 overflow-y-auto h-screen">
        <Outlet />
      </div>

      {/* Fixed Follower */}
      <div className="w-1/5 fixed h-screen right-0">
        <Follower />
      </div>
    </div>
  );
};

export default MainLayout;
