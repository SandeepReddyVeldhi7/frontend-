import React from 'react'
import CategoryList from "../components/CategoryList.js";
import Banner from "../components/Banner.js";
import HorizontalCardProduct from "../components/HorizontalCardProduct.js";
import VerticalCardProduct from '../components/VerticalCardProducr.js';
const Home = () => {
  return (
    <div className="my-2">
      <CategoryList />
      <Banner />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"televisions"}
        heading={"Popular's Televisions"}
      />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />

      <HorizontalCardProduct
        category={"mobiles"}
        heading={"Popular's Mobiles"}
      />

      <HorizontalCardProduct
        category={"refrigerator"}
        heading={"Popular's Refrigerator"}
      />

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
    </div>
  );
}

export default Home;