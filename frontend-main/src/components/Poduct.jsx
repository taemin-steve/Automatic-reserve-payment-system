import React, { useState } from "react";
import styled from "styled-components";
import ExProduct from "../images/ExProduct.png";
import ReviewModal from "./ReviewModal";

function Product() {
  // const [brandName, setBrandName] = useState("");
  // const [productName, setProductName] = useState("");
  // const [option, setOption] = useState("");
  // const [date, setDate] = useState("");
  // const [price, setPrice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // 추가: 선택된 데이터를 저장하는 상태

  const showModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const sampleData = [
    {
      imgUrl:
        "https://m.en.triplestore.co.kr/web/product/small/202210/7477d9121837705b005d10cfbd986148.jpg",
      userImgUrl: "",
      ImgFilename:"21.jpg",
      userImgFilename: "",
      brandName: "에스피오나지",
      productName: "Miller Heavyweight Cardigan Burnt Orange",
      option: "M",
      date: "2023-06-24",
      price: 32000,
      isPhotoReviewed: false,
    },
    {
      imgUrl:
        "https://image.msscdn.net/images/goods_img/20200820/1558197/1558197_16760173335705_500.jpg",
      userImgUrl: "",
      userImgFilename: "",
      ImgFilename:"20.jpg",
      brandName: "무신사",
      productName: "릴렉스드 베이식 블레이저 [블랙] ",
      option: "31",
      date: "2023-06-31",
      price: 48000,
      isPhotoReviewed: false,
    },
    {
      imgUrl:
        "https://image.msscdn.net/images/goods_img/20200803/1535337/1535337_1_big.jpg",
      userImgUrl: "",
      ImgFilename:"18.jpg",
      userImgFilename: "",
      brandName: "코드그라피",
      productName: "[DIVO] RDS 유틸리티 덕다운 푸파 숏패딩_쿨그레이",
      option: "XL",
      date: "2023-07-11",
      price: 22000,
      isPhotoReviewed: false,
    },
    {
      imgUrl:
        "https://image.msscdn.net/images/goods_img/20220509/2546882/2546882_2_big.jpg",
      userImgUrl: "",
      ImgFilename:"pro1.jpg",
      userImgFilename: "",
      brandName: "벌스데이슈트",
      productName: "CITY STADIUM JACKET (GREY)",
      option: "XL",
      date: "2023-07-11",
      price: 22000,
      isPhotoReviewed: false,
    },
  ];

  return (
    <>
      {sampleData.map((el, index) => (
        <Wrapper key={index}>
          <DetailWrapper width="20%">
            <PhotoWrapper src={el.imgUrl}></PhotoWrapper>
          </DetailWrapper>
          <DetailWrapper width="40%">
            <ProductDetail>{el.brandName}</ProductDetail>
            <ProductDetail>{el.productName}</ProductDetail>
            <ProductDetail marginbottom="5px" color="#9e9e9e" fontSize="20px">
              사이즈 : {el.option}
            </ProductDetail>
            <ProductDetail color="#9e9e9e" fontSize="20px">
              가격 : {el.price}원
            </ProductDetail>
          </DetailWrapper>
          <DetailWrapper width="20%">
            <ProductDetail fontSize="24px">{el.date}</ProductDetail>
          </DetailWrapper>
          <DetailWrapper>
            <ReviewButton>일반후기 작성하기</ReviewButton>
            <ReviewButton onClick={() => showModal(el)}>
              포토후기 작성하기
            </ReviewButton>
            {modalOpen && (
              <ReviewModal setModalOpen={setModalOpen} modalData={modalData} />
            )}
          </DetailWrapper>
        </Wrapper>
      ))}
    </>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-contents: center;
  background-color: white;
  height: 200px;
  color: black;
  font-size: 32px;
  padding: 15px;
  margin: 6px 12px;
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
  font-size: ${(props) => props.fontSize || "28px"};
`;

const ReviewButton = styled.button`
  width: 240px;
  height: 50px;
  margin: 5px;
  font-size: 20px;
  color: white;
  background-color: black;
  border: 0px;
  &:hover {
    cursor: pointer;
  }
`;

export default Product;
