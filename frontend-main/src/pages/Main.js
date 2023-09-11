import React from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import ClothesMenu from "../components/ClothesMenu";
import Banner from "../images/Banner.png";
import MainImg from "../images/MainImg.png";
import BannerImg1 from "../images/BannerImg1.png";
import BannerImg2 from "../images/BannerImg2.png";
// import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <Navbar />
      <BannerImg src={BannerImg2} />
      <ClothesMenu />
      <ProductImg src={MainImg} />
    </div>
  );
}

const BannerImg = styled.img`
  width: 100%;
`;

const ProductImg = styled.img`
  width: 100%;
`;

export default Main;
