import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/users/authUserSlice";
import AsyncHandler from "express-async-handler";
import { setCredentials } from "../../redux/users/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userIcon from "../../assets/user.png";
// import dotenv from "dotenv";
// import "./EditProfile.css"; // Import the CSS file

const EditProfile = () => {
  const user = useSelector((state) => state.auth);

  const [name, setName] = React.useState(user.userInfo.name || "");
  const [email, setEmail] = React.useState(user.userInfo.email || "");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  // dotenv.config();

  // console.log(process.env.PROFILE_URL);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  const [UpdateProfile] = useUpdateProfileMutation();

  // file click
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setImageUrl(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check password match before submitting
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if newPassword has a value and oldPassword doesn't have
    if (newPassword && !oldPassword) {
      toast.error("Please enter your old password");
      return;
    }

    // Check if new password is at least 8 characters long only if a new password is entered
    if (newPassword && newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (imageUrl) {
      // setImageUrl(document.getElementById("fileInput").files[0]);
      console.log(imageUrl);
    }

    // if (imageUrl.startsWith("blob:")) {
    //   setImageUrl(URL.revokeObjectURL(imageUrl));
    //   console.log(imageUrl);
    // }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("oldPassword", oldPassword);
    data.append("newPassword", newPassword);
    data.append("confirmPassword", confirmPassword);
    data.append("image", imageUrl);

    try {
      const res = await UpdateProfile(data).unwrap();

      // Assuming the unwrap function correctly parses the JSON response and throws an error if the API responded with an error status
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      // Assuming the error object contains a data property with the message
      console.log(error.data.message);
      toast.error(
        error.data.message || "An error occurred while updating the profile"
      );
    }
  };

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <ToastContainer />
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-4/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            {/* <h2 className="pl-6 text-2xl font-bold lg:ml-52 sm:text-xl">
              Public Profile
            </h2> */}
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                {userInfo.imageUrl ? (
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={"http://localhost:5000/uploads/" + userInfo.imageUrl}
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
                    onClick={() => document.getElementById("fileInput").click()}
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
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                  >
                    Delete picture
                  </button>
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
                      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
