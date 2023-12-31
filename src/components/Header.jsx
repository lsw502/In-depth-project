// Navbar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Login from 'components/Login';
import Signup from 'components/SignUp';

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState('login');

    const handleLoginClick = () => {
        setModalOpen(true);
        setActiveForm('login');
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <NavbarWrapper className={isMobile ? 'mobile' : ''}>
            <div className="logo">{isMobile ? '애드잇22' : '애드잇22'}</div>
            <NavLinks>
                <NavLinkItem>
                    <Link to="/">홈</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="/board">게시판</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="/profile">마이페이지</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <button onClick={handleLoginClick}>로그인</button>
                </NavLinkItem>
            </NavLinks>
            <div>
                {isModalOpen && (
                    <div className="modal">
                        {activeForm === 'login' ? (
                            <Login onClose={handleModalClose} />
                        ) : (
                            <Signup onClose={handleModalClose} />
                        )}
                    </div>
                )}
            </div>
        </NavbarWrapper>
    );
};

export default Navbar;

const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: lightblue;
    color: black;

    .logo {
        font-size: 1.5rem;
    }
`;

const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
`;

const NavLinkItem = styled.li`
    margin-right: 20px;

    a {
        text-decoration: none; /* Remove underline from links */
        color: black; /* Set link color */
    }
`;
