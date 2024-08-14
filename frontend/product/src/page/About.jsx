
import React from 'react';
import logo from "../assest/shop.png"
export default function About() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center mt-10">
            <img 
              src={logo} 
              alt="About Us" 
              className="rounded-lg  shadow-lg w-full md:w-3/4" 
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg text-gray-600 mb-4">
              Welcome to our e-commerce platform! We are dedicated to providing you with the best products at unbeatable prices. Our mission is to make your shopping experience easy, enjoyable, and secure.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              With a wide range of products from top brands, we aim to meet all your shopping needs in one place. Our team is committed to ensuring that every customer is satisfied with their purchase.
            </p>
            <p className="text-lg text-gray-600">
              Thank you for choosing us. We look forward to serving you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
