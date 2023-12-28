import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../redux/components/Header';
import Footer from '../redux/components/Footer';
import Navbar from '../redux/components/Navbar';

const Layout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
