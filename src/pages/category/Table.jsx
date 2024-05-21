import React, { useContext } from "react";
import { Edit, Trash } from "react-feather";
import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
} from "../../redux/transaction/categoryApi";
import moment from "moment";
import { Skeletoncatgory } from "./Skeletoncatgory";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ModelShowContext } from "../../context/ModelShow";

const Table = ({ selectedCategory, setSelectedCategory }) => {
  const { showModal, handleModelShow } = useContext(ModelShowContext);
  const { data, isLoading } = useGetCategoriesQuery();
  const [deleteCategories, { isLoading: isDeleting }] =
    useDeleteCategoriesMutation();

  const handleEdit = async (category) => {
    setSelectedCategory(category);
    handleModelShow(true);
  };

  const handleDelete = (id) => {
    const clickedId = id;
    console.log(clickedId);
    Swal.fire({
      title: "Delete Category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategories(clickedId).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          toast.success("Category deleted successfully");
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Failed!",
            "Failed to delete category: " +
              (err?.data?.message || err.message || "Unknown error"),
            "error"
          );
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  if (isLoading) return <Skeletoncatgory />;
  return (
    <>
      <div>
        {/* <TransactionsDataTable /> */}
        <table className="table-auto w-[100%] mt-4 rounded-lg overflow-hidden">
          <thead className="bg-white text-[#121B28] border">
            <tr>
              <th className="px-2 py-2 text-start">No</th>
              <th className="px-2 py-2 text-start">Date</th>
              <th className="px-2 py-2 text-start">Category</th>
              <th className="px-4 py-2 text-start">Description</th>
              <th className="px-4 py-2 text-start">status</th>
              <th className="px-4 py-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 bg-white border">
            {data?.data?.map((category, index) => {
              // console.log(category.status);
              return (
                <tr key={category._id}>
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">
                    {moment(category.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="max-w-xs px-4 py-2 break-words truncate">
                    {category.type}
                  </td>
                  <td className="px-4 py-2">{category.description}</td>
                  <td className="px-4 py-2">
                    {category.status ? "true" : "false"}
                  </td>
                  <td className="px-4 py-2 space-x-2 font-bold">
                    <button>
                      <Edit
                        className="w-5 h-5 text-green-500"
                        onClick={() => handleEdit(category)}
                        disabled={isLoading}
                      />
                    </button>
                    <button>
                      <Trash
                        className="w-5 h-5 text-red-500"
                        onClick={() => handleDelete(category._id)}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
