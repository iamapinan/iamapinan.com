import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold italic">
          <Link to="/">iamapinan</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/articles" className="text-gray-300 hover:text-white">Blogs</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">About me</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;