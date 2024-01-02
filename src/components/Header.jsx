// Navbar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { getAuth, signOut } from '@firebase/auth';
// import { useDispatch } from 'react-redux';

const Navbar = () => {
    // const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);
    // const uid = localStorage.getItem('uid');
    // const [login, setLogin] = useState(!!uid);
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

    // const auth = getAuth();

    // const handlelogout = async () => {
    //     if (uid) {
    //         await signOut(auth);
    //         setLogin(false);
    //         dispatch();
    //     }
    // };

    return (
        <NavbarWrapper>
            <NavLinks>
                <NavLinkItem>
                    <Link to="/">애니잇</Link>
                </NavLinkItem>
            </NavLinks>

            <NavLinks>
                <NavLinkItem>
                    <Link to="/">홈</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="/board">게시판</Link>
                </NavLinkItem>

                <NavLinkItem>
                    <Link to="/login">로그인</Link>
                    {/* <Link onClick={handlelogout} to="/login">
                        {login ? '로그아웃' : '로그인'}
                    </Link> */}
                </NavLinkItem>
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
