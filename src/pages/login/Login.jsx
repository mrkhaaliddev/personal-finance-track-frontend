import React from "react";
import { Lock, Mail } from "react-feather";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/users/authUserSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setCredentials } from "../../redux/users/authSlice";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // console.log(errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (data) => {
    const { email, password } = data;
    try {
      const res = await login({ email, password }).unwrap();
      console.log({ ...res });
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.log(err.data.message);
      toast.error(err.data.message || err.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center mx-auto mt-20 w-96">
        <div className="w-[340px]">
          {" "}
          <div className="mb-8">
            <h1 className="w-full pb-2 text-2xl font-semibold">
              Welcome back!
            </h1>
            <p className="text-sm font-normal text-slate-400">
              Start managing your finance faster and better
            </p>
          </div>
          <saction>
            <form
              action=""
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col mb-3 gap-y-2"
            >
              <div className="relative">
                <Mail className="absolute bg-white rounded left-2 top-[17px] z-10 w-[16px] h-[16px] text-[#157AFF]" />
                <input
                  className="relative w-full bg-[#F6F7F9]  outline-slate-200 text-sm px-8 py-[12px] rounded-md"
                  type="text"
                  {...register("email", {
                    required: "Emali is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                  placeholder="you@exmaple.com"
                />
                <small className="text-red-500">{errors?.email?.message}</small>
              </div>
              <div className="relative">
                <Lock className="absolute left-2 top-[15px] z-10 w-[16px] h-[16px] text-[#157AFF]" />
                <input
                  className="relative w-full bg-[#F6F7F9] outline-slate-200 text-sm px-8 py-[12px] rounded-md"
                  type="text"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 8,
                      message: "minLength must be 8",
                    },
                  })}
                  placeholder="At least 8 charecters"
                />
                <small className="text-red-500">
                  {errors?.password?.message}
                </small>
              </div>
              <Link to="/forgetPassword">
                {" "}
                <p className="text-sm text-[#157AFF] text-right font-semibold">
                  Forgot password?
                </p>
              </Link>
              <button className="py-[10px] rounded-md w-full bg-[#157AFF] text-white text-sm">
                Login
              </button>
            </form>
          </saction>
          <div className="flex mb-10 gap-x-4">
            <div className="w-40 border-b border-slate-200"></div>
            <p className="pt-5 text-slate-400">or</p>
            <div className="w-40 border-b border-slate-200"></div>
          </div>
          <div className="flex gap-x-3 max-w-[340px] mb-10">
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                className="absolute left-8 top-[10px]"
                alt=""
                width={16}
                height={16}
              />
              <button className="relative py-2 text-sm font-semibold border rounded-md px-14 border-slate-200">
                Google
              </button>
            </div>{" "}
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png"
                className="absolute left-8 top-[10px]"
                alt=""
                width={18}
                height={18}
              />
              <button className="relative py-2 text-sm font-semibold border rounded-md px-14 border-slate-200">
                Facebook
              </button>
            </div>{" "}
          </div>
        </div>
        <p className="text-[13px] text-slate-400 font-normal">
          Don't you have an account?{" "}
          <Link to="/register" className="text-[#157AFF] font-semibold">
            Sign Up
          </Link>{" "}
        </p>
        <footer className="mt-24 text-xs font-semibold text-slate-400 ">
          &copy; 2024 ALL RIGHTS RESERVED
        </footer>
      </div>
    </>
  );
};

export default Login;
