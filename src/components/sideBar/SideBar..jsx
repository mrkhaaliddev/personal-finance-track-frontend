import { Link, useLocation, useNavigate } from "react-router-dom";
import JtechLogo from "../../assets/Jtech Logo.png";
import { TiHome } from "react-icons/ti";
import { TbArrowsExchange } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { Briefcase } from "react-feather";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { NavBarHiddenContext } from "../../context/NavBarHidden";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/users/authSlice";
import { useLogoutMutation } from "../../redux/users/authUserSlice";

const SideBar = () => {
  const { isShow, handleSideBar } = useContext(NavBarHiddenContext);
  const location = useLocation();
  // console.log(location);
  // console.log(isShow);

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-[#f2f3f4] text-black"
      : "bg-[#121B28] text-[#ACB0B4]";
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { userInfo } = useSelector((state) => state.auth);

  const [Logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await Logout().unwrap();
      console.log({ ...res });
      dispatch(logout());
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {isShow && (
        <div className="fixed flex flex-col bg-[#121B28] w-[240px] min-h-[100vh]">
          <div className="mx-auto -mt-6 Logo">
            <Link to="/dashboard">
              <img src={JtechLogo} alt="" className="w-32 " />
            </Link>
          </div>
          <div className="flex flex-col gap-3 mx-5 mr-12">
            <div className="relative w-full">
              <Link
                to="/dashboard"
                className={`relative block font-semibold rounded-lg text-[16px] hover:text-black hover:bg-[#f2f3f4] w-full py-3 ${isActive(
                  "/dashboard"
                )} ${isActive("/")}`}
              >
                <span className="flex items-center justify-start">
                  <TiHome className="w-6 h-6 mx-2 group-hover:text-black" />
                  Dashboard
                </span>
              </Link>
            </div>
            <div className="relative w-full">
              <Link
                to="/transaction"
                className={`relative block font-semibold rounded-lg text-[16px] hover:text-black hover:bg-[#f2f3f4] w-full py-3 ${isActive(
                  "/transaction"
                )}`}
              >
                <span className="flex items-center justify-start">
                  <TbArrowsExchange className="w-6 h-6 mx-2 group-hover:text-black" />
                  Transaction
                </span>
              </Link>
            </div>
            <div className="relative w-full">
              <Link
                to="/category"
                className={`relative block font-semibold rounded-lg text-[16px] hover:text-black hover:bg-[#f2f3f4] w-full py-3 ${isActive(
                  "/category"
                )}`}
              >
                <span className="flex items-center justify-start">
                  <BiCategory className="w-6 h-6 mx-2 group-hover:text-black" />
                  Category
                </span>
              </Link>
            </div>
            <div className="relative w-full">
              <Link
                to="/budget"
                className={`relative block font-semibold rounded-lg text-[16px] hover:text-black hover:bg-[#f2f3f4] w-full py-3 ${isActive(
                  "/budget"
                )}`}
              >
                <span className="flex items-center justify-start">
                  <Briefcase className="w-6 h-6 mx-2 group-hover:text-black" />
                  Budget
                </span>
              </Link>
            </div>
            <div className="relative w-full">
              <Link
                to="/report"
                className={`relative block font-semibold rounded-lg text-[16px] hover:text-black hover:bg-[#f2f3f4] w-full py-3 ${isActive(
                  "/report"
                )}`}
              >
                <span className="flex items-center justify-start">
                  <TbReport className="w-6 h-6 mx-2 group-hover:text-black" />
                  Report
                </span>
              </Link>
            </div>
            <div className="relative w-full">
              <Link
                to="/settings"
                className={`relative block font-semibold rounded-lg text-[16px] hover:text-black hover:bg-[#f2f3f4] w-full py-3 ${isActive(
                  "/settings"
                )}`}
              >
                <span className="flex items-center justify-start">
                  <IoSettingsSharp className="w-6 h-6 mx-2 group-hover:text-black" />
                  Settings
                </span>
              </Link>
            </div>

            <div className="relative w-full mt-40 group">
              <button
                onClick={handleLogout}
                className="relative block text-[#ACB0B4] font-semibold hover:text-white hover:bg-[#EF4363] rounded-lg text-[16px] w-full py-3"
              >
                <span className="flex items-center justify-start">
                  <IoLogOut className="w-6 h-6 mx-2 text-[#ACB0B4] hover:text-white" />
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
