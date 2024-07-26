import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "../../redux/users/authUserSlice";
import AsyncHandler from "express-async-handler";
import { setCredentials } from "../../redux/users/authSlice";
import { toast } from "react-toastify";
import userIcon from "../../assets/user.png";
import { ExitIcon } from "@radix-ui/react-icons";

const ProfileSettings = () => {
  const user = useSelector((state) => state.auth);

  const [name, setName] = useState(user.userInfo.name || "");
  const [email, setEmail] = useState(user.userInfo.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // dotenv.config();

  // console.log("env import", import.meta.env.VITE_PROFILE_URL);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  // console.log(userInfo);

  const [UpdateProfile] = useUpdateProfileMutation();
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [profileImage] = useUpdateProfileImageMutation();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImageUrl(file);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await profileImage(data).unwrap();
      console.log("image uploaded", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword && !oldPassword) {
      toast.error("Please enter your old password");
      return;
    }

    if (newPassword && newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("oldPassword", oldPassword);
    data.append("newPassword", newPassword);
    data.append("confirmPassword", confirmPassword);
    data.append("image", imageUrl);

    try {
      if (data || imageUrl) {
        const res = await UpdateProfile(data).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error.data.message);
      toast.error(
        error.data.message || "An error occurred while updating the profile"
      );
    }
  };

  return (
    <>
      <div className="w-full lg:pl-96 flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-4/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex items-center lg:space-y-5 lg:flex-col sm:flex-row sm:space-y-0">
                  {profileData?.user?.imageUrl ? (
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                      src={
                        "http://localhost:5000/uploads/" +
                        profileData?.user?.imageUrl
                      }
                      alt="Preview"
                    />
                  ) : (
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                      src={userIcon}
                      alt="Bordered avatar"
                    />
                  )}
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Change picture
                    </button>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {/* <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium focus:outline-none hover:text-white hover:bg-[#292931] bg-white rounded-lg border border-indigo-200 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Delete picture
                    </button> */}
                  </div>
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Your first name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="your.email@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Old Password
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-[#121B28] hover:bg-[#202142] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSettings;
