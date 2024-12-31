import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const HeaderClient = (props: Props) => {
  return (
    <header className="header flex justify-between items-center py-4 px-10 bg-black text-white shadow-lg">
      <div className="logo text-2xl font-bold">
        <Link to="/home">MangaKa</Link>
      </div>
      <div className="menu flex items-center gap-x-6">
        <Link to="/">
          <span className="font-bold hover:text-gray-400 transition-colors">
            Home
          </span>
        </Link>
        <Link to="/">
          <span className="hover:text-gray-400 transition-colors">
            On going
          </span>
        </Link>
        <Link to="/">
          <span className="hover:text-gray-400 transition-colors">
            Completed
          </span>
        </Link>
        <Link to="/">
          <span className="hover:text-gray-400 transition-colors">Manhua</span>
        </Link>
        <Link to="/">
          <span className="hover:text-gray-400 transition-colors">Mangas</span>
        </Link>
        <Link to="/">
          <span className="hover:text-gray-400 transition-colors">Profile</span>
        </Link>
      </div>
    </header>
  );
};

export default HeaderClient;
