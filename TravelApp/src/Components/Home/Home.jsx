import React from "react";
import "./home.css";
import video from "../../assets/video1.mp4";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandTwitter } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="overlay"></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>

        <div className="homeContent container">
          <div className="textDiv">
            <h1 className="homeTitle"> Search your holiday</h1>
          </div>
          <div className="cardDiv grid">
            <div className="destinationInput">
              <label htmlFor="city">Search your destination</label>
              <div className="input flex">
                <input type="text" placeholder="Enter name here..." />
              </div>
            </div>
            <div className="destinationInput">
              <label htmlFor="city">Select your date</label>
              <div className="input flex">
                <input type="date" placeholder="Enter date here..." />
              </div>
            </div>
          </div>

          <div className="leftIcons">
            <FaInstagram className="icon" />
            <TbBrandTwitter className="icon" />
            <RiFacebookCircleLine className="icon" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
