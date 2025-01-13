import React, {useContext, useEffect, useState} from 'react';
import {Switch, Table} from 'antd';
import {AuthContext} from '../contexts/AuthContext.jsx';

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const { getUser, toggleAdmin } = useContext(AuthContext);

    const fetchData = async () => {
        setLoading(true);
        try {
            const users = await getUser();
            setData(
                users.map((user) => ({
                    key: user.id,
                    name: user.name,
                    email: user.email,
                    is_admin: user.is_admin,
                }))
            );
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdminToggle = async (userId, isAdmin) => {
        try {
            await toggleAdmin(userId, isAdmin);
            setData((prevData) =>
                prevData.map((user) =>
                    user.key === userId ? { ...user, is_admin: isAdmin } : user
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении прав администратора:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams.sortOrder,
        tableParams.sortField,
    ]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            sortOrder: sorter?.order,
            sortField: sorter?.field,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
        },
        {
            title: 'Admin',
            dataIndex: 'is_admin',
            key: 'is_admin',
            render: (isAdmin, record) => (
                <Switch
                    checked={isAdmin}
                    onChange={(checked) => handleAdminToggle(record.key, checked)}
                />
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            rowKey={(record) => record.key}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Users;
