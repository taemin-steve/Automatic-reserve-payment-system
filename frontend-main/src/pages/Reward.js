import React from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import GetReviewed from "../components/GetReviewed";

function Reward() {
  return (
    <Wrapper>
      <Navbar />
      <TitleBox> 적립금 확인하기 </TitleBox>
      <BodyBox>
        <hr />
        <SmallTitle>
          <DetailWrapper width="50%">
            <ProductDetail>상품명</ProductDetail>
          </DetailWrapper>
          <DetailWrapper width="10%">
            <ProductDetail fontSize="20px">옵션</ProductDetail>
          </DetailWrapper>
          <DetailWrapper width="20%">
            <ProductDetail fontSize="20px">구입날짜</ProductDetail>
          </DetailWrapper>
          <DetailWrapper width="20%">
            <ProductDetail fontSize="20px">지급내용</ProductDetail>
          </DetailWrapper>
        </SmallTitle>
        <hr />
        <GetReviewed />
      </BodyBox>
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

const BodyBox = styled.div`
  padding: 0px;
  background-color: white;
  height: 70%;
  color: black;
  font-size: 32px;
  padding: 27px;
  margin: 12px 12px 6px 12px;
`;

const SmallTitle = styled.div`
  font-size: 20px;
  display: flex;
  font-size: 32px;
  padding: 0 15px;
  margin: 6px 12px;
`;

const DetailWrapper = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
`;

const ProductDetail = styled.div`
  margin-top: ${(props) => props.margintop || "0px"};
  margin-bottom: ${(props) => props.marginbottom || "0px"};
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "20px"};
`;

export default Reward;
