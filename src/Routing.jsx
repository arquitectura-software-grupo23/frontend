import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";


function Routing() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Routing;
