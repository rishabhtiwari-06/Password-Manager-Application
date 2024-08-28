import React from "react";

const Navbar = () => {
  return (
    <nav className="flex bg-purple-800 justify-around items-center px-4 h-14 text-white">
      <div className="font-bold text-xl">
        <span className="text-green-500">&lt;</span>Pass{" "}
        <span className="text-green-500">Op/&gt;</span>
      </div>
      <div>
        <img
          className=" h-8 invert"
          src="/icons/github.svg"
          alt="github Logo"
        />
      </div>
    </nav>
  );
};

export default Navbar;
