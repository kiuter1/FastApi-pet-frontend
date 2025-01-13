import React, {useContext} from 'react';
import {Button, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext.jsx';


const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

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
