import React from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Product from "../components/Poduct";

function Review() {
  return (
    <Wrapper>
      <Navbar />
      <TitleBox> 후기 작성하기 </TitleBox>
      <Product />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: relative;
  background-color: #eeeeee;
  color: white;
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.nav`
  box-sizing: border-box;
  background-color: white;
  height: 98px;
  color: black;
  font-size: 32px;
  padding: 27px;
  margin: 12px 12px 6px 12px;
`;

export default Review;
