import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const isLogin = useSelector((state) => state.authSlice.isLogin);

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

    const handleLogoutClick = () => {
        alert('정말 로그아웃 하시겠습니까?');
        dispatch(logout());
        navigate('/');
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

                {isLogin ? (
                    <NavLinkItem>
                        <button onClick={handleLogoutClick}>로그아웃</button>
                    </NavLinkItem>
                ) : (
                    <NavLinkItem>
                        <Link to="/login">로그인</Link>
                    </NavLinkItem>
                )}
            </NavLinks>
        </NavbarWrapper>
    );
};

export default Navbar;

const NavbarWrapper = styled.nav`
    width: 100%;
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
