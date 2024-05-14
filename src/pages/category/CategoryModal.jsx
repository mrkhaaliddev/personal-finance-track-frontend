import React, { useContext, useEffect, useState } from "react";
import { X } from "react-feather";
import { ModelShowContext } from "../../context/ModelShow";
import { useForm } from "react-hook-form";
import {
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
} from "../../redux/transaction/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryModal = ({ selectedCategory, setSelectedCategory }) => {
  const { showModal, handleModelShow } = useContext(ModelShowContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      description: "",
      status: false,
    },
  });

  // this is for when you are editing a cetegory
  useEffect(() => {
    if (selectedCategory !== null) {
      reset({
        type: selectedCategory.type,
        description: selectedCategory.description,
        status: selectedCategory.status,
      });
    }
  }, [showModal, selectedCategory]);

  // this is for when you are creating a cetegory

  const handleClose = () => {
    handleModelShow(false);
    setSelectedCategory(null);
    reset();
  };

  const [CreateCategories, { isLoading }] = useCreateCategoriesMutation();

  // Reset to default values when showModal changes
  useEffect(() => {
    if (!showModal) {
      reset({
        type: "",
        description: "",
        status: false,
      });
    }
  }, [showModal, reset]);

  const [UpdateCategories, { isLoading: isUpdating }] =
    useUpdateCategoriesMutation();

  const submitHandler = async (data) => {
    const { type, description, status } = data;
    console.log(type, description, status);

    try {
      if (!selectedCategory) {
        const res = await CreateCategories({
          type,
          description,
          status,
        }).unwrap();
        console.log("Response:", res);

        toast.success("Category created successfully");
        handleModelShow(false);
        reset();
      } else {
        const updatedCategory = {
          type: type.toUpperCase(),
          description,
          status,
        };

        const res = await UpdateCategories({
          data: updatedCategory,
          categoryId: selectedCategory._id,
        }).unwrap();
        console.log(res);
        toast.success("Category updated successfully");
        handleModelShow(false);
        reset();
      }
    } catch (err) {
      console.error("Error from server:", err);
      toast.error(err.data?.message || "Unknown error");
    }
  };

  return (
    <>
      <ToastContainer />
      {showModal && (
        <>
          {" "}
          <form action="" onSubmit={handleSubmit(submitHandler)}>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            <div className="relative inset-0 z-50 flex items-center justify-center w-full h-full">
              <div className="absolute mt-[550px] -ml-40 w-[700px] h-fit bg-white border border-slate-400 rounded-lg px-5 py-5">
                <div className="flex items-center justify-between mb-5">
                  <h1 className="text-2xl font-semibold">Transaction Form</h1>
                  <X
                    onClick={handleClose}
                    className="cursor-pointer text-slate-500 hover:text-slate-800"
                  />
                </div>

                <div className="flex flex-col mb-5 space-y-1">
                  {" "}
                  <label
                    htmlFor=""
                    className={`font-semibold ${
                      errors.type?.message ? "text-red-500" : "text-slate-700"
                    }`}
                  >
                    type
                  </label>
                  <input
                    {...register("type", {
                      required: "This field is required",
                    })}
                    type="text"
                    className={`h-10 pl-2 border rounded-lg border-slate-300 ${
                      errors.type?.message
                        ? "outline-red-500 border-red-500"
                        : "outline-2 outline-[#157AFF]"
                    }`}
                    placeholder="Enter Your type"
                  />
                  <small className="text-[16px] text-red-500">
                    {errors.type?.message}
                  </small>
                </div>

                <div>
                  <div className="flex flex-col mb-10 space-y-1">
                    {" "}
                    <label htmlFor="" className="font-semibold">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      cols="30"
                      rows="5"
                      className="py-1 pl-2 border rounded-lg border-slate-400 outline-slate-300"
                      placeholder="Desc..."
                    ></textarea>
                    <small className="pl-2 font-semibold">
                      {errors.description?.message
                        ? ""
                        : "Add description for your category"}
                    </small>
                  </div>
                </div>
                <div className="flex flex-col w-20 gap-1">
                  <label htmlFor="" className={`font-semibold`}>
                    Status
                  </label>
                  <input
                    {...register("status")}
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <small className="text-[16px] text-red-500">
                    {errors.status?.message}
                  </small>
                </div>
                <div className="flex justify-end gap-x-3">
                  <button
                    onClick={handleClose}
                    className="px-3 py-1 border-2 border-[#121B28] hover:text-white hover:bg-[#121B28] rounded-md"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-1 text-white text-lg bg-[#398bff] rounded-md">
                    save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CategoryModal;
