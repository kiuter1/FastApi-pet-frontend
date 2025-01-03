import React from 'react';
import {useState} from "react";
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import AddTour from "./AddTour.jsx";
import Card from "./Card.jsx";
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
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    {
                        key: '7',
                        label: 'Option 7',
                    },
                    {
                        key: '8',
                        label: 'Option 8',
                    },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                label: 'Option 12',
            },
        ],
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            {
                key: '13',
                label: 'Option 13',
            },
            {
                key: '14',
                label: 'Option 14',
            },
        ],
    },
];

const Navigation = () => {



    const [selectedKey, setSelectedKey] = useState('1'); // Состояние для хранения выбранного ключа

    const onClick = (e) => {
        setSelectedKey(e.key); // Устанавливаем ключ при клике
    };

    // Содержимое для отображения
    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <AddTour/>;
            case '2':
                return <Card/> ;
            case '5':
                return <div>Content for "Option 5"</div>;
            case '6':
                return <div>Content for "Option 6"</div>;
            case '7':
                return <div>Content for "Option 7"</div>;
            case '8':
                return <div>Content for "Option 8"</div>;
            default:
                return <div>Select an option</div>;
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