import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Homepage,
  NavBar,
  Checkout,
  SearchResult,
  ProductPage,
} from "./components";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
