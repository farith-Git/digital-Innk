import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Products from "./pages/productList";
import Basket from "./pages/basket";
import Orders from "./pages/orders";
// import "./App.css";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Basket />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;