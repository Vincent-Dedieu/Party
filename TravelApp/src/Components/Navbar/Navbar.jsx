import React, { useState } from "react";
import "./navbar.css";
import { MdTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";

const Navbar = () => {
  const [active, setActive] = useState("navBar");

  const shownavBar = () => {
    setActive("navBar activeNavbar");
  };

  const removeNavbar = () => {
    setActive("navBar");
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1>
              <MdTravelExplore className="icon" />
              Travel.
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItems">
              <a className="navLink" href="#">
                Home
              </a>
            </li>
            <li className="navItems">
              <a className="navLink" href="#">
                Packages
              </a>
            </li>
            <li className="navItems">
              <a className="navLink" href="#">
                Shop
              </a>
            </li>
            <li className="navItems">
              <a className="navLink" href="#">
                Pages
              </a>
            </li>
            <li className="navItems">
              <a className="navLink" href="#">
                News
              </a>
            </li>
            <li className="navItems">
              <a className="navLink" href="#">
                Contact
              </a>
            </li>
            <button className="btn">
              <a href="#">Book now</a>
            </button>
          </ul>
          <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={shownavBar} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
