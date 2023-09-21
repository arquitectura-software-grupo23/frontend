import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StockHistory from "./components/StockHistory";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ChartContainer from "./components/chartContainer";


function Routing() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:symbol"} element={<StockHistory />} />
          <Route path={"/chart/:symbol"} element={<ChartContainer />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Routing;
