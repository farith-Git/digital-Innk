import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Products from "./pages/productList";
import Basket from "./pages/basket";
// import "./App.css";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Basket />} />
      </Routes>
    </>
  );
}

export default App;