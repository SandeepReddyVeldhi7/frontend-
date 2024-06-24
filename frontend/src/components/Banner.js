import { desktopImages,mobileImages } from "../utils/bannerUrls";
import { useState,useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);
  
     const nextImage = () => {
       if (desktopImages.length - 1 > currentImage) {
         setCurrentImage((preve) => preve + 1);
       }
     };

     const preveImage = () => {
       if (currentImage != 0) {
         setCurrentImage((preve) => preve - 1);
       }
     };

     useEffect(() => {
       const interval = setInterval(() => {
         if (desktopImages.length - 1 > currentImage) {
           nextImage();
         } else {
           setCurrentImage(0);
         }
       }, 5000);

       return () => clearInterval(interval);
     }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/**desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/**mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
