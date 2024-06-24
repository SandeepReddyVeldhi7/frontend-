

const imageToBase64 = async (image) => {
    
    const read = new FileReader()
    read.readAsDataURL(image)
    const data = await new Promise((reslove, reject) => {
        read.onload = () => reslove(read.result)
        
        read.onerror= error =>reject(error)
    })
    return data
}

export default imageToBase64;