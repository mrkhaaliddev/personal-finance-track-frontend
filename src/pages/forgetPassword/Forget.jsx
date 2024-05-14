import React from "react";
import { Lock, Mail } from "react-feather";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const Forget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(errors);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mx-auto items-center w-96 mt-20">
        <div className="w-[340px]">
          {" "}
          <div className="mb-8">
            <h1 className="text-2xl w-full font-semibold pb-2">
              Forget Password!
            </h1>
            <p className="text-sm text-slate-400 font-normal">
              Start managing your finance faster and better
            </p>
          </div>
          <saction>
            <form
              action=""
              onSubmit={handleSubmit((data) => {
                console.log(data);
                navigate("/login");
              })}
              className="flex flex-col gap-y-2 mb-3"
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
              <button className="py-[10px] rounded-md w-full bg-[#157AFF] text-white text-sm">
                Forget
              </button>
            </form>
          </saction>
          <div className="flex gap-x-4 mb-10">
            <div className="border-b border-slate-200 w-40"></div>
            <p className="text-slate-400 pt-5">or</p>
            <div className="border-b border-slate-200 w-40"></div>
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
              <button className="relative px-14 py-2 border border-slate-200 rounded-md text-sm font-semibold">
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
              <button className="relative px-14 py-2 border border-slate-200 rounded-md text-sm font-semibold">
                Facebook
              </button>
            </div>{" "}
          </div>
        </div>
        <p className="text-[13px] text-slate-400 font-normal">
          Go Back to Sign In?{"  "}
          <Link to="/login" className="text-[#157AFF] font-semibold">
            Sign In
          </Link>{" "}
        </p>
        <footer className="text-xs text-slate-400 mt-24 font-semibold ">
          &copy; 2024 ALL RIGHTS RESERVED
        </footer>
      </div>
    </>
  );
};

export default Forget;
