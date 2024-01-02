// Navbar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

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

    const handleHomeClick = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <NavbarWrapper>
            <NavLinks>
                <NavLinkItem>
                    <Link to="/" onClick={handleHomeClick}>
                        애니잇
                    </Link>
                </NavLinkItem>
            </NavLinks>
            <NavLinks>
                <NavLinkItem>
                    <Link to="/" onClick={handleHomeClick}>
                        홈
                    </Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="/board">게시판</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="/login">마이페이지</Link>
                </NavLinkItem>
            </NavLinks>
        </NavbarWrapper>
    );
};

export default Navbar;

const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: black;
    color: white;

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
        color: white; /* Set link color */
    }
`;
// const LoginButton = styled.button`
//     border: none;
//     background-color: transparent;
//     cursor: pointer;
// `;
