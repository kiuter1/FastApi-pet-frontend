import React, {useState} from 'react';
import {AppstoreOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import AddTour from "./AddTour.jsx";
import Card from "./Card.jsx";
import Users from "./Users.jsx";
import Orders from "./Orders.jsx";

const items = [
    {
        key: 'sub1',
        label: 'Tour',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Tour Administration',
                type: 'group',
                children: [
                    {
                        key: '1',
                        label: 'Add a tour',
                    },
                    {
                        key: '2',
                        label: 'View tours',
                    },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'User',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '5',
                label: 'User list',
            },
            {
                key: '6',
                label: 'Order list',
            },
        ],
    },
];

const Navigation = () => {



    const [selectedKey, setSelectedKey] = useState('1');

    const onClick = (e) => {
        setSelectedKey(e.key);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <AddTour/>;
            case '2':
                return <Card/> ;
            case '5':
                return <Users/>;
            case '6':
                return <Orders/>;
        }
    };


    return (
        <div className="flex">
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <div className="mx-auto my-auto">
                {renderContent()}
            </div>
        </div>
    );
};
export default Navigation;