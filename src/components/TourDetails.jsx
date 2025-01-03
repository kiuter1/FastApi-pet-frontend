import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, Carousel, Button, Modal, message, Form, Input, InputNumber } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AuthContext } from "../contexts/AuthContext.jsx";

const { Meta } = Card;

const TourDetails = ({ tour, onBack }) => {
    const carouselRef = useRef(null);
    const hasPhotos = tour.photos && tour.photos.length > 0;
    const { user, deleteTour, token, editedTour, addedOrder } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        if (user) {
            setIsAdmin(user["is_admin"]);
        }
    }, [user]);

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    const handleNext = () => {
        carouselRef.current?.next();
    };

    const handleEdit = () => {
        let modal; // Для управления закрытием модального окна

        modal = Modal.info({
            title: `Edit Tour "${tour.name}"`,
            content: (
                <Form
                    name="editTour"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        name: tour.name,
                        location: tour.location,
                        description: tour.description,
                        price: tour.price,
                    }}
                    onFinish={async (values) => {
                        try {
                            await editedTour(tour.id, values.name, values.location, values.description, values.price, values.photo);
                            message.success(`Tour "${values.name}" has been updated.`);
                            modal.destroy(); // Закрыть модальное окно
                            window.location.reload()
                        } catch (error) {
                            message.error("Failed to update the tour.");
                        }
                    }}
                    onFinishFailed={(errorInfo) => {
                        console.log("Failed:", errorInfo);
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input tour name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: 'Please input tour location!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input tour description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input tour price!' }]}
                    >
                        <InputNumber min={0} addonAfter="$" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => modal.destroy()} // Закрыть модальное окно
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            ),
            okButtonProps: { style: { display: 'none' } }, // Убираем стандартную кнопку OK
        });
    };

    const handleBuyTour = () => {
        let modal;

        modal = Modal.info({
            title: `Buy Tour "${tour.name}"`,
            content: (
                <Form
                    name="buyTour"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={async (values) => {
                        try {
                            await addedOrder(values.fullName, values.contact, values.people, values.comments, tour.id);
                            message.success(`You have successfully purchased the tour "${tour.name}"!`);
                            modal.destroy(); // Закрыть модальное окно
                        } catch (error) {
                            message.error("Failed to complete the purchase.");
                        }
                    }}
                    onFinishFailed={(errorInfo) => {
                        console.log("Failed:", errorInfo);
                    }}
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contact Info"
                        name="contact"
                        rules={[{ required: true, message: 'Please enter your contact information!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Number of People"
                        name="people"
                        rules={[{ required: true, message: 'Please enter the number of people!' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        label="Comments"
                        name="comments"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Confirm Purchase
                        </Button>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => modal.destroy()} // Закрыть модальное окно
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            ),
            okButtonProps: { style: { display: 'none' } }, // Убираем стандартную кнопку OK
        });
    };

    const handleDelete = async () => {
        Modal.confirm({
            title: `Delete Tour "${tour.name}"`,
            content: "Are you sure you want to delete this tour? This action cannot be undone.",
            okText: "Delete",
            cancelText: "Cancel",
            onOk: async () => {
                try {
                    await deleteTour(tour.id, token);
                    message.success(`Tour "${tour.name}" has been deleted.`);
                    window.location.reload();
                } catch (error) {
                    message.error("Failed to delete the tour.");
                }
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card
                hoverable
                style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}
                cover={
                    hasPhotos ? (
                        tour.photos.length === 1 ? (
                            <img
                                alt={tour.name}
                                src={tour.photos[0].url}
                                style={{ height: "300px", objectFit: "cover", width: "100%" }}
                            />
                        ) : (
                            <div style={{ position: "relative" }}>
                                <Carousel ref={carouselRef}>
                                    {tour.photos.map((photo) => (
                                        <img
                                            key={photo.id}
                                            alt={tour.name}
                                            src={photo.url}
                                            style={{ height: "300px", objectFit: "cover", width: "100%" }}
                                        />
                                    ))}
                                </Carousel>
                                <Button
                                    icon={<LeftOutlined />}
                                    onClick={handlePrev}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "-20px",
                                        transform: "translateY(-50%)",
                                        zIndex: 1,
                                    }}
                                />
                                <Button
                                    icon={<RightOutlined />}
                                    onClick={handleNext}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "-20px",
                                        transform: "translateY(-50%)",
                                        zIndex: 1,
                                    }}
                                />
                            </div>
                        )
                    ) : (
                        <div
                            style={{
                                height: "300px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                            }}
                        >
                            <p>No photos available</p>
                        </div>
                    )
                }
            >
                <Meta
                    title={tour.name}
                    description={
                        <>
                            <p>{tour.description}</p>
                            <p><b>Location:</b> {tour.location}</p>
                            <p><b>Price:</b> ${tour.price}</p>
                        </>
                    }
                />
            </Card>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                {isAdmin && (
                    <>
                        <Button type="primary" onClick={handleEdit}>
                            Edit Tour
                        </Button>
                        <Button danger onClick={handleDelete}>
                            Delete Tour
                        </Button>
                    </>
                )}
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" onClick={handleBuyTour}>
                    Buy Tour
                </Button>
                <Button type="primary"
                    onClick={onBack}
                >
                    Back to all tours
                </Button>
            </div>
        </div>
    );
};

export default TourDetails;
