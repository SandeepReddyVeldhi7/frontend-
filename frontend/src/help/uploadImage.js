
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
      
const uploadImage = async(image) => {
  const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset", "Project");
    
try {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const dataResponse = await response.json();
  return dataResponse;
} catch (error) {

  throw error; // Re-throw the error so the caller can handle it
}
    

}

export default uploadImage