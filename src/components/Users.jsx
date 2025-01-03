import React, { useContext, useEffect, useState } from 'react';
import { Table, Switch } from 'antd';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    // Получаем функции из AuthContext
    const { getUser, toggleAdmin } = useContext(AuthContext);

    // Функция для получения данных пользователей
    const fetchData = async () => {
        setLoading(true);
        try {
            const users = await getUser(); // Запрос к API для получения списка пользователей
            setData(
                users.map((user) => ({
                    key: user.id, // Уникальный ключ для каждой строки
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

    // Обновление поля is_admin через API
    const handleAdminToggle = async (userId, isAdmin) => {
        try {
            await toggleAdmin(userId, isAdmin); // Запрос для обновления статуса is_admin
            setData((prevData) =>
                prevData.map((user) =>
                    user.key === userId ? { ...user, is_admin: isAdmin } : user
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении прав администратора:', error);
        }
    };

    // Загрузка данных при изменении параметров таблицы
    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams.sortOrder,
        tableParams.sortField,
    ]);

    // Обработка изменений в таблице
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            sortOrder: sorter?.order,
            sortField: sorter?.field,
        });

        // Если размер страницы изменился, сбрасываем данные
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    // Определение колонок таблицы
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
            rowKey={(record) => record.key} // Уникальный идентификатор строки
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Users;
