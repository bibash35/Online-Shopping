import React, { useEffect, useRef, useState } from 'react'
import rider from "../assest/rider.jpg"
import { MdDeliveryDining } from "react-icons/md";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useSelector } from 'react-redux';
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';

export default function Home() {
  // const productData = useSelector((state) => state.product.value)
  const productData = useSelector((state) => state.product.productList);

  const homeProductCartList = productData.slice(1,5)
  const homeProductCartListVegetables = productData.filter((el) => el.category === "vegetable",
    []);
  // const categoryList = [...new Set(productData.map(el => el.category))];
  //  //filter data display
  //  const [filterby, setFilterBy] = useState("");
  //  const [dataFilter, setDataFilter] = useState([]);
  //  useEffect(() => {
  //   setDataFilter(productData);
  // }, [productData]);

  // const handleFilterProduct = (category) => {
  //   setFilterBy(category)
  //   const filter = productData.filter(
  //     (el) => el.category.toLowerCase() === category.toLowerCase()
  //   );
  //   setDataFilter(() => {
  //     return [...filter];
  //   });
  // };
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  }
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  }
  return (
    <>
      <div className='p-3 md:p-4 '>
        <div className='md:flex gap-20  py-2'>
          <div className="leftpanel md:w-1/2">
            <div className='flex items-center gap-3 bg-slate-400 w-40 px-2 rounded-full'>
              <p className='text-sm font-bold'>Bike Delivery</p>
              <MdDeliveryDining className='text-4xl text-red-500' />
            </div>
            <h2 className='text-4xl font-bold md:text-6xl py-3'>The Fastest Delivery in <span className='text-red-600 '>Your Home</span></h2>
            <p className='py-3 text-base '>SpeedyHome delivers essentials to your doorstep with unmatched speed and reliability. Our mission is to provide the fastest delivery service, ensuring convenience and satisfaction for our customers, no matter the time or place.</p>
            <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
          </div>
          <div className='rightside md:w-1/2 flex flex-wrap gap-4 p-4 justify-center  '>
            {
              homeProductCartList[0] ? homeProductCartList.map((el) => {
                return (
                  <HomeCard key={el._id} id={el._id} name={el.name} category={el.category}
                    image={el.image} price={el.price} description={el.description} />
                )
              })
                : loadingArray.map((el, index) => {
                  return <HomeCard key={index + "loading"} loading={"Loading..."} />;
                })
            }
          </div>
        </div>
        <div className="naya">
          <div className="flex w-full items-center">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">
              Fresh Vegetables
            </h2>
            <div className="ml-auto flex gap-4 ">
              <button
                onClick={preveProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
              >
                <GrPrevious />
              </button>
              <button
                onClick={nextProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
              >
                <GrNext />
              </button>
            </div>
          </div>
          <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth 
        transition-all" ref={slideProductRef}
          >
            {
              homeProductCartListVegetables[0] ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature key={el._id} id={el._id} name={el.name}
                    category={el.category} image={el.image} price={el.price} />
                )
              })
                : loadingArrayFeature.map((el, index) => {
                  return <CardFeature key={index + "loading"} loading={"Loading..."} />;
                })
            }
          </div>
        </div>
        {/* <div className="forall my-5">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Your Products
          </h2>
          <div className="forfilter flex gap-4 justify-center overflow-scroll scrollbar-none ">
            {
              categoryList[0] && categoryList.map((el) => {
                return (
                  <FilterProduct key={el} category={el} 
                  onClick={()=>handleFilterProduct(el)}
                  isActive={el.toLowerCase() === filterby.toLowerCase()} />

                )
              })
            }

          </div>
          <div className="todisplaydata flex flex-wrap justify-center gap-4 my-4">
          {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : 
          loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index+"allProduct"} />
            ))}
          </div>
        </div> */}
      <AllProduct heading={"Your Product"}/>

      </div>

    </>
  )
}
