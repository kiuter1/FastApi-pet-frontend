import React, {useState, useContext, useEffect} from 'react';
import { Button, Result,Flex, Spin  } from 'antd';
import Navigation from "./Navigation.jsx";
import {AuthContext} from "../contexts/AuthContext.jsx";


const Admin = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        if (user) {
            setIsAdmin(user["is_admin"]);
        }
    }, [user]);

    if (isAdmin === null) {
        return (<div className="flex justify-center items-center">
            <Flex align="center" gap="middle">
                <Spin size="large" />
            </Flex>
        </div>);

    }

    if (isAdmin) {
        return (
            <div>
                <Navigation />
            </div>
        );
    } else {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" href={"/"}>Back Home</Button>}
            />
        );
    }
};

export default Admin;