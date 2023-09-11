import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState(null);

  const sendTextToServer = async () => {
    try {
      const response = await fetch("http://0.0.0.0:8000/photoReview", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data);
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div>
      <button onClick={sendTextToServer}>Send Text</button>
      <p>Response from server:</p>
      {response && (
        <ul>
          <li>
            Image URL: <img src={response.imgUrl} alt="Product" />
          </li>
          <li>
            User Image URL: <img src={response.userImgUrl} alt="User" />
          </li>
          <li>Brand Name: {response.brandName}</li>
          <li>Product Name: {response.productName}</li>
          <li>Option: {response.option}</li>
          <li>Date: {response.date}</li>
          <li>Price: {response.price}</li>
          <li>Is Photo Reviewed: {response.isPhotoReviewed ? "Yes" : "No"}</li>
          <li>거절사유 : {response.whyRejected}</li>
        </ul>
      )}
    </div>
  );
}

export default App;
