import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { AlignLeft } from "react-feather";
import { NavBarHiddenContext } from "../../context/NavBarHidden";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useLogoutMutation,
} from "../../redux/users/authUserSlice";
import { logout } from "../../redux/users/authSlice";
// import { LuUser } from "react-icons/lu";
import { LuUser } from "react-icons/lu";

const Header = () => {
  const { isShow, handleSideBar } = useContext(NavBarHiddenContext);
  const [profileShow, setProfileShow] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // making logout backend Functionality
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [Logout] = useLogoutMutation();
  const { data: profileData, isLoading } = useGetProfileQuery();

  console.log(profileData?.user?.imageUrl);

  // this will make you go login page and it's logout functionality
  const handleLogout = async () => {
    try {
      const res = await Logout().unwrap();
      console.log({ ...res });
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileClick = () => {
    setProfileShow(!profileShow);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileShow]);

  return (
    <>
      <div className="flex items-center justify-between px-10 py-4 bg-white">
        <div className="flex items-center select-none gap-x-5">
          <div>
            <AlignLeft
              onClick={handleSideBar}
              className="w-6 h-6 cursor-pointer text-custom-dark align-middle hover:text-[#6e84a3]"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-custom-dark">
              Dashboard
            </h1>
          </div>
        </div>
        <div
          className="relative flex items-center justify-center gap-6 mr-10 select-none"
          ref={profileRef}
        >
          <div
            className="flex items-center justify-center gap-x-2"
            title="Profile"
          >
            <div>
              <LuUser style={{ width: "20px", height: "20px" }} />
            </div>
            <h1 className="text-lg font-semibold select-text cursor-text text-custom-dark">
              {isLoading ? "name" : profileData?.user?.name}
            </h1>
          </div>

          {profileData?.user?.imageUrl ? (
            <img
              className="object-cover w-12 h-12 p-[1px] rounded-full ring-2 ring-[#3e6293] dark:ring-[#3e6293] cursor-pointer"
              src={
                "http://localhost:5000/uploads/" + profileData?.user?.imageUrl
              }
              onClick={handleProfileClick}
              alt="Bordered avatar"
            />
          ) : (
            <img
              className="object-cover w-12 h-12 p-[1px] rounded-full ring-2 ring-[#3e6293] dark:ring-[#3e6293] cursor-pointer"
              src={userIcon}
              onClick={handleProfileClick}
              alt="Bordered avatar"
            />
          )}
          {profileShow && (
            <div className="absolute z-10 mt-[17px]  bg-white rounded-lg shadow-md w-[130px] -right-10 top-full py-2">
              <Link to="/Edit-profile">
                <button className="w-full py-1 pl-3 font-semibold text-left text-custom-dark hover:bg-slate-100 ">
                  Edit profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-1 pl-3 font-semibold text-left text-custom-dark hover:bg-slate-100 "
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
