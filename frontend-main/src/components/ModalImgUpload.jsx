import { useState } from "react";
import styled from "styled-components";
import Camera from "../images/Camera.png";

// function ModalImgUpload({ getUserImgUrl }) {
//   const [imageSrc, setImageSrc] = useState(null);

//   // const onUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   const reader = new FileReader();
//   //   reader.readAsDataURL(file);

//   //   return new Promise((resolve) => {
//   //     reader.onload = () => {
//   //       // console.log(imageSrc);
//   //       setImageSrc(reader.result || null);
//   //       resolve();
//   //     };
//   //   });
//   const onUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       const imageData = reader.result || null;
//       setImageSrc(imageData);
//       getUserImgUrl(imageData);
//     };
//   };
//   // console.log("URL : " + imageSrc);
//   return (
//     <Wrapper>
//       <Input
//         accept="image/*"
//         multiple
//         type="file"
//         onChange={(e) => onUpload(e)}
//         id="input-file"
//       />
//       <Label htmlFor="input-file">
//         <LabelImg src={Camera} />
//         <div>사진 업로드</div>
//       </Label>
//       <Label htmlFor="input-file">
//         <Img src={imageSrc} />
//       </Label>
//     </Wrapper>
//   );
// }
function ModalImgUpload({ getUserImgUrl, getUserImgFilename }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState(null);

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageData = reader.result || null;
      setImageSrc(imageData);
      const fileName = file.name;

      getUserImgUrl(imageData);
      getUserImgFilename(fileName);
    };
  };

  return (
    <Wrapper>
      <Input
        accept="image/*"
        multiple
        type="file"
        onChange={(e) => onUpload(e)}
        id="input-file"
      />
      <Label htmlFor="input-file">
        <LabelImg src={Camera} />
        <div>사진 업로드</div>
      </Label>
      <Label htmlFor="input-file">
        <Img src={imageSrc} />
      </Label>
      {imageName && <div>파일 이름: {imageName}</div>}
    </Wrapper>
  );
}

export default ModalImgUpload;

const Wrapper = styled.div`
  background-color: white;
  // margin: 5px;
  border-radius: 5px;
  width: 40%;
  height: 240px;
`;

const Img = styled.img`
  height: 240px;
  width: 100%;
  object-fit: contain;
  position: relative;
  top: -240px;
  z-index: 1;
`;

const Label = styled.label`
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const Input = styled.input`
  display: none;
`;
const LabelImg = styled.img`
  //   position: relative;
  //   top: -240px;
`;
