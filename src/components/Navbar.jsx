import React, { useContext } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom'; // Для навигации между страницами
import { AuthContext } from '../contexts/AuthContext.jsx';

const { Header } = Layout;

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext); // Получаем статус авторизации

    const menuItems = [
        {
            key: '1',
            label: <Link to="/">Home</Link>,
        },
        {
            key: '2',
            label: <Link to="/tours">Tours</Link>,
        },
        ...(isAuthenticated
            ? [
                {
                    key: '5',
                    label: (
                        <Button
                            type="default"
                            onClick={logout}
                            style={{ marginLeft: 'auto' }}
                        >
                            Logout
                        </Button>
                    ),
                },
            ]
            : [
                {
                    key: '3',
                    label: (
                        <Link to="/login">
                            <Button
                                type="primary"
                                style={{ marginLeft: 'auto' }}
                            >
                                Login
                            </Button>
                        </Link>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <Link to="/registration">
                            <Button
                                type="default"
                                style={{ marginLeft: 'auto' }}
                            >
                                Register
                            </Button>
                        </Link>
                    ),
                },
            ]),
    ];

    return (
            <Menu mode="horizontal" items={menuItems} />
    );
};

export default Navbar;
