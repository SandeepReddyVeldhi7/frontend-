import toast from "react-hot-toast"
import RegisterApi from '../utils/Constant'

const addToCard = async(e,id) => {
  e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(RegisterApi.addToCartProduct.url,{
        method : RegisterApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()

    if (response.status === 401) {
      toast.error("Please Login...");
    } else if (responseData.success) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }
  

    return responseData
}

export default addToCard