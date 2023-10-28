import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StockHistory from "./components/StockHistory";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ChartContainer from "./components/chartContainer";
import UserRegressionRequests from "./components/Projections";
import ProjectionChart from "./components/ProjectionChart";


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
          <Route path={"/projections"} element={<UserRegressionRequests />} />
          <Route path={"/projection/:jobId"} element={<ProjectionChart />}/>


        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Routing;
