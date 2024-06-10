import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-hot-toast'
// import {BsCloudUpload} from "react-icons/bs"

export default function Newproduct() {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })
  function handleChange(e) {
    // console.log(e.target.name);
    // console.log(e.target.name.value);
    if (e.target.name == "image") {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }
      function handleSubmit(e) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("image", data.image);
    
        axios.post("http://localhost:7000/api/products", formData,)
        // axios.post("https://ecommerce-sagartmg2.vercel.app/api/products", formData,)
          .then((res) => {
            toast("Updated successfully")
            setData(()=>{
              return{
                name : "",
                category : "",
                image : "",
                price : "",
                description : ""
              }
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }
  return (
   <>
   <div className='p-4'>
    <form className='m-auto w-full max-w-md p-3 shadow-md flex flex-col bg-white'
    onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
      <input type="text"
       name="name"
       value={data.name}
       onChange={handleChange}
       className='bg-slate-200 p-1 my-1'
       />

      <label htmlFor="category">Category</label>
      <select className='bg-slate-200 p-1 my-1' id='category'
       name='category'
       value={data.category}
       onChange={handleChange}
       >
<option value="other">select category</option>
<option value="fruits">Fruits</option>
<option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
      </select>
      
    
     
       {/* <label htmlFor='image'>Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
            
            
           <input type={"file"} accept="image/*" id="image"  onChange={handleChange} className="hidden"/>
        </div>
        </label> */}
      
       <label htmlFor="image">Image</label>
       <input type="file"
       name="image"
       onChange={handleChange}
       accept="image/*" id="image"
       className='bg-slate-200 p-1 my-1'
       />
                 <label htmlFor='price' className='my-1' >Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price'
        value={data.price}  onChange={handleChange}/>

<label htmlFor='description'>Description</label>
        <textarea rows={2} name=" description" value={data.description} onChange={handleChange} className='bg-slate-200 p-1 my-1 resize-none' name='description'  onChange={handleChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
    </form>
   </div>
   </>
  )
}
