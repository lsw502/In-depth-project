import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Board from '../pages/Board';
import BoardDetail from '../pages/BoardDetail';
import Layout from '../layout/Layout';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Detail from 'components/Detail';


const Router = () => {
    return (
<<<<<<< HEAD
        <>

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
        </>


=======
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
>>>>>>> a4a6fcb38b0118923e14912d3e043e4cc7dd7896
    );
};

export default Router;
