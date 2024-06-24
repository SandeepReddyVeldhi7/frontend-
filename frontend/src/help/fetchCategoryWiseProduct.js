import RegisterApi from "../utils/Constant.js";

const fetchCategoryWiseProduct = async (category) => {
    try {
    const response = await fetch(RegisterApi.categoryWiseProduct.url,{
        method : RegisterApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({category})
    })
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      

    const dataResponse = await response.json()

    return dataResponse

}catch (error) {
        console.error('Error fetching category-wise products:', error);
        return { error: true, message: error.message };
    }
};

export default fetchCategoryWiseProduct;

