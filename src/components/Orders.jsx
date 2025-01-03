import React, { useContext, useEffect, useState } from 'react';
import { Table, Switch, Button, Popconfirm } from 'antd';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    // Получаем функции из AuthContext
    const { getOrder, updateOrderStatus, deleteOrder } = useContext(AuthContext);

    // Функция для получения данных заказов
    const fetchData = async () => {
        setLoading(true);
        try {
            const orders = await getOrder(); // Запрос к API для получения списка заказов
            setData(
                orders.map((order) => ({
                    key: order.id, // Уникальный ключ для каждой строки
                    fullname: order.fullname,
                    contact: order.contact,
                    comments: order.comments,
                    persons: order.persons,
                    user_name: order.user.name,
                    user_email: order.user.email,
                    tour_name: order.tour.name,
                    tour_location: order.tour.location,
                    tour_price: order.tour.price,
                    is_done: order.is_done, // Добавляем новое поле is_done
                }))
            );
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
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

    // Обновление статуса is_done через API
    const handleDoneToggle = async (orderId, isDone) => {
        try {
            await updateOrderStatus(orderId, isDone); // Запрос для обновления статуса
            setData((prevData) =>
                prevData.map((order) =>
                    order.key === orderId ? { ...order, is_done: isDone } : order
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
        }
    };

    // Удаление заказа
    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId); // Запрос для удаления заказа
            setData((prevData) => prevData.filter((order) => order.key !== orderId)); // Удаляем заказ из таблицы
        } catch (error) {
            console.error('Ошибка при удалении заказа:', error);
        }
    };

    // Определение колонок таблицы
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Persons',
            dataIndex: 'persons',
            key: 'persons',
        },
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'User Email',
            dataIndex: 'user_email',
            key: 'user_email',
        },
        {
            title: 'Tour Name',
            dataIndex: 'tour_name',
            key: 'tour_name',
        },
        {
            title: 'Tour Location',
            dataIndex: 'tour_location',
            key: 'tour_location',
        },
        {
            title: 'Tour Price',
            dataIndex: 'tour_price',
            key: 'tour_price',
            render: (price) => `$${price.toFixed(2)}`, // Форматируем цену
        },
        {
            title: 'Is Done',
            dataIndex: 'is_done',
            key: 'is_done',
            render: (isDone, record) => (
                <Switch
                    checked={isDone}
                    onChange={(checked) => handleDoneToggle(record.key, checked)}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete this order?"
                    onConfirm={() => handleDelete(record.key)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" danger>
                        Delete
                    </Button>
                </Popconfirm>
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

export default Orders;
