import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Board from "../pages/Board";
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/board" element={<Board />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
