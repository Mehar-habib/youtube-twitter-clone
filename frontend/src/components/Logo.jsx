// import React from 'react'

import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

function Logo({ size = "30" }) {
  return (
    <>
      <Link to={"/"} className="flex gap-2 items-center">
        <IoLogoYoutube size={size} color="#A855F7" />
        <span className="font-bold">Youtube</span>
      </Link>
    </>
  );
}

export default Logo;
