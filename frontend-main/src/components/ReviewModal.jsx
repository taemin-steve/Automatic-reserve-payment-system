import React, { useState } from "react";
import styled from "styled-components";
import ModalImgUpload from "./ModalImgUpload";
import X from "../images/X.png";
import xOver from "../images/XOver.png";
import Yellow from "../images/Yellow.png";
import Green from "../images/Green.png";

function ReviewModal({ setModalOpen, modalData }) {
  const [xImg, setXImg] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const getUserImgUrl = (x) => {
    modalData.userImgUrl = x;
  };
  const getUserImgFilename = (x) => {
    modalData.userImgFilename = x;
  };
  const submitData = async () => {
    console.log(modalData);
    try {
      const response = await fetch("http://localhost:50000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalData),
      });
      closeModal();
      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Wrapper>
      <Top>
        <XButton
          onMouseOver={() => setXImg(true)}
          onMouseOut={() => setXImg(false)}
          src={xImg ? xOver : X}
          onClick={closeModal}
        />
        <XButton margin="4px 0 0 8px" src={Yellow} />
        <XButton margin="4px 0 0 8px" src={Green} />
      </Top>
      <Box> 포토후기 작성하기</Box>
      {modalData && (
        <Box height="auto">
          <DetailWrapper width="24%">
            <PhotoWrapper src={modalData.imgUrl}></PhotoWrapper>
          </DetailWrapper>
          <DetailWrapper width="40%">
            <ProductDetail>{modalData.brandName}</ProductDetail>
            <ProductDetail>{modalData.productName}</ProductDetail>
            <ProductDetail marginbottom="0px" color="#9e9e9e" fontSize="20px">
              사이즈 : {modalData.option}
            </ProductDetail>
            <ProductDetail color="#9e9e9e" fontSize="20px">
              가격 : {modalData.price}원
            </ProductDetail>
          </DetailWrapper>
          {/* <DetailWrapper width="20%">
            <ProductDetail fontSize="24px">{modalData.date}</ProductDetail>
          </DetailWrapper> */}
        </Box>
      )}
      {/* <Box>{modalData.brandName}</Box> */}
      <Box backgroundcolor="none" height="240px">
        <ModalImgUpload
          getUserImgUrl={getUserImgUrl}
          getUserImgFilename={getUserImgFilename}
          id="imgUpload"
        />
        <TextReview type="text" placeholder="텍스트 리뷰를 작성하여 주세요" />
      </Box>
      <Box onClick={submitData} justifycontent="center">
        제출하기
      </Box>
    </Wrapper>
  );
}

export default ReviewModal;

const Wrapper = styled.div`
  position: absolute;
  max-width: 800px;
  width: 70%;
  height: auto;
  border-radius: 5px;
  background-color: black;
  top: 100px;
  left: 15%;
`;

const Top = styled.div`
  background-color: #555555;
  border-radius: 5px 5px 0 0;
  height: 36px;
  display: flex;
  align-items: center;
  jsutify-content: center;
`;

const XButton = styled.img`
  width: 12px;
  height: 12px;
  // margin: 0 0 0 15px;
  margin: ${(props) => props.margin || "4px 0 0 15px"};
`;

const Box = styled.div`
  // background-color: white;
  background-color: ${(props) => props.backgroundcolor || "white"};
  margin: 8px;
  border-radius: 5px;
  // height: 55px;
  height: ${(props) => props.height || "55px"};
  font-size: 24px;
  display: flex;
  justify-content: ${(props) => props.justifycontent || "left"};
  align-items: center;
`;

const ImgUpload = styled.div``;

const TextReview = styled.textarea`
  width: 470px;
  height: 240px;
  margin-left: 8px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const PhotoWrapper = styled.img`
  width: 160px;
  height: 190px;
`;

const DetailWrapper = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
`;

const ProductDetail = styled.div`
  margin-top: ${(props) => props.margintop || "0px"};
  margin-bottom: ${(props) => props.marginbottom || "10px"};
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "24px"};
`;

const ReviewButton = styled.button`
  width: 240px;
  height: 50px;
  margin: 5px;
  font-size: 16px;
  color: white;
  background-color: black;
  border: 0px;
`;
