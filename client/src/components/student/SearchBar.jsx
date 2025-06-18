import React, { useState } from 'react';
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const [input, setInput] = useState(data ? data : '');
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate('/coures-list/' + input);  // Fixed route spelling
  };

  return (
    <form onSubmit={onSearch} className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded ">
      <img src={assets.search_icon} alt='search icon' className='md:w-auto w-10 px-3' />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type='text'
        placeholder='Search for Courses'
        className='w-full h-full text-gray-500/80 outline-none'

      />
      <button type='submit' className='bg-blue-600 text-white md:px-10 px-7 md:py-3 mx-1 rounded'>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
