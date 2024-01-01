import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Board from '../pages/Board';
import BoardDetail from '../pages/BoardDetail';
import Layout from '../layout/Layout';
import Login from 'pages/Login';
import Signup from 'pages/Signup';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/board/:id" element={<BoardDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
