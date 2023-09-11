import React from "react";
import styled from "styled-components";

const ClothesMenu = () => {
  return (
    <Wrapper>
      <Clothes>Best</Clothes>
      <Clothes>Top</Clothes>
      <Clothes>Outer</Clothes>
      <Clothes>Pants</Clothes>
      <Clothes>Onepiece</Clothes>
      <Clothes>Skirt</Clothes>
      <Clothes>Sneakers</Clothes>
      <Clothes>Shoes</Clothes>
      <Clothes>Bag</Clothes>
      <Clothes>Headwear</Clothes>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  color: black;
  width: 100%;
  height: 70px;
  font: 28px;
  display: flex;
  justify-content: space-around;
`;

const Clothes = styled.span`
  font-size: 28px;
`;

export default ClothesMenu;
