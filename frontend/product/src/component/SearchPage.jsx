
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardFeature from './CardFeature';
import { useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const productData = useSelector((state) => state.product.productList) || [];
  const searchTerm = useSelector((state) => state.product.searchTerm);

  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = productData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDataFilter(filteredData);
    } else {
      setDataFilter([]);

    }
  }, [productData, searchTerm]);

  const handleTryDifferentKeywordsClick = () => {
    setTimeout(() => {
      const searchBox = document.querySelector('input[placeholder="Search Products"]');
      if (searchBox) {
        searchBox.focus();
      }
    }, 100); 
  };

  return (
    <div className="search-results-container flex flex-wrap justify-center gap-4 my-4">
      {dataFilter.length > 0 ? (
        dataFilter.map((product) => (
          <CardFeature
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            category={product.category}
            price={product.price}
          />
        ))
      ) : (
       
        <>
 <div className="text-center mt-44">
          <p className="text-2xl mb-6 text-red-500 font-bold">No products found</p>
          <button className="text-2xl underline text-white bg-blue-500 rounded-full px-7 py-1"
          onClick={handleTryDifferentKeywordsClick}>
            Try Different Keywords
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;

