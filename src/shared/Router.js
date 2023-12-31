import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Board from '../pages/Board';
import BoardDetail from '../pages/BoardDetail';
import Layout from '../layout/Layout';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import GlobalStyle from 'styles/Globalstyle';
import Detail from 'components/Detail';


const Router = () => {
    return (

        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies/:movieId" element={<Detail />} />
                        <Route path="/board" element={<Board />} />
                        <Route path="/board/:id" element={<BoardDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;
