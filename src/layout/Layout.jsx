import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../redux/components/Header';
import Footer from '../redux/components/Footer';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
