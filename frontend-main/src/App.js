import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Review from "./pages/Review";
import Result from "./pages/Result";
import Reward from "./pages/Reward";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Reward" element={<Reward />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
