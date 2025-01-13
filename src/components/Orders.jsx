import React, {useContext, useEffect, useState} from 'react';
import {Button, Popconfirm, Switch, Table} from 'antd';
import {AuthContext} from '../contexts/AuthContext.jsx';

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const { getOrder, updateOrderStatus, deleteOrder } = useContext(AuthContext);

    const fetchData = async () => {
        setLoading(true);
        try {
            const orders = await getOrder();
            setData(
                orders.map((order) => ({
                    key: order.id,
                    fullname: order.fullname,
                    contact: order.contact,
                    comments: order.comments,
                    persons: order.persons,
                    user_name: order.user.name,
                    user_email: order.user.email,
                    tour_name: order.tour.name,
                    tour_location: order.tour.location,
                    tour_price: order.tour.price,
                    is_done: order.is_done,
                }))
            );
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
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

    const handleDoneToggle = async (orderId, isDone) => {
        try {
            await updateOrderStatus(orderId, isDone);
            setData((prevData) =>
                prevData.map((order) =>
                    order.key === orderId ? { ...order, is_done: isDone } : order
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setData((prevData) => prevData.filter((order) => order.key !== orderId));
        } catch (error) {
            console.error('Ошибка при удалении заказа:', error);
        }
    };

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
            render: (price) => `$${price.toFixed(2)}`,
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
            rowKey={(record) => record.key}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};

export default Orders;
