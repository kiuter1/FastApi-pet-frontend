import React, { useEffect, useState } from 'react';
import { Card, Spin, Row, Col } from 'antd';
import TourDetails from './TourDetails'; // Импорт нового компонента
const { Meta } = Card;
import { getTours } from "../api.js";

const MyCard = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTour, setSelectedTour] = useState(null); // Для выбранного тура

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const toursData = await getTours();
                setTours(toursData);
            } catch (error) {
                console.error("Failed to fetch tours:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    if (tours.length === 0) {
        return <div>No tours available</div>;
    }

    // Если выбран тур, отображаем компонент TourDetails
    if (selectedTour) {
        return (
            <TourDetails
                tour={selectedTour}
                onBack={() => setSelectedTour(null)} // Возвращение к списку
            />
        );
    }

    // Отображение списка всех туров
    return (
        <Row gutter={[16, 16]} justify="center">
            {tours.map((tour) => (
                <Col key={tour.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <img
                                alt={tour.name}
                                src={tour.photos?.[0]?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtf8m7yhZPyCqkrasXp_L-375L-Rfpm-rBiQ&s"}
                                style={{ height: "150px", objectFit: "cover" }}
                            />
                        }
                        onClick={() => setSelectedTour(tour)} // Передача тура
                    >
                        <Meta
                            title={tour.name}
                            description={`Price: $${tour.price}`}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default MyCard;
