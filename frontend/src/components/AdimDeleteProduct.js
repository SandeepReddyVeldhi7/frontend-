import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDeleteProduct = ({ productData, onClose, fetchdata }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "/delete-product", // Adjust the URL according to your route
        { productId: productData._id },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (responseData?.success) {
        toast.success(responseData?.message);
        await fetchdata(); // Refresh the data
        onClose(); // Close the modal
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-md h-full max-h-[40%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Confirm Delete</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            {/* Close icon can be added here */}
          </div>
        </div>
        <div className="p-4">
          <p>
            Are you sure you want to delete the product "
            {productData.productName}"?
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="px-3 py-2 bg-gray-300 mr-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 bg-red-600 text-white rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteProduct;
