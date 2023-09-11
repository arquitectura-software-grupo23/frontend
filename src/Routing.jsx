import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StockHistory from "./components/StockHistory";

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:symbol"} element={<StockHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Routing;
