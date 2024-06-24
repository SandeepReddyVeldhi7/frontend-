import React from 'react'
import RegisterApi from '../utils/Constant';
import { useEffect, useState } from "react";
import axios from "axios"
import UploadProduct from '../components/UploadProduct.js';
import AdminProductCard from '../components/AdminProductCard.js';

const AllProducts = () => {
   const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(RegisterApi.allProducts.url, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setAllProduct(response?.data?.data);
          //console.log("product data", response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error
      }
    };

     useEffect(() => {
       fetchAllProducts();
        
     }, []);
     
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/**all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product,index) => (
            
              <AdminProductCard
               data={product}
               key={index}
               fetchdata={fetchAllProducts}
              />
          
          )
        )}
      </div>

      {/**upload prouct component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProducts}
        />
      )}
    </div>
  );

}

export default AllProducts