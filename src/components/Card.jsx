import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Input, Row, Spin} from 'antd';
import TourDetails from './TourDetails';
import {getTours} from "../api.js";

const { Meta } = Card;

const MyCard = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTour, setSelectedTour] = useState(null);
    const [filter, setFilter] = useState({ location: "", minPrice: "", maxPrice: "" });

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

    const filteredTours = tours.filter((tour) => {
        const { location, minPrice, maxPrice } = filter;
        const matchesLocation = location === "" || tour.location.toLowerCase().includes(location.toLowerCase());
        const matchesMinPrice = minPrice === "" || tour.price >= parseFloat(minPrice);
        const matchesMaxPrice = maxPrice === "" || tour.price <= parseFloat(maxPrice);

        return matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const handleResetFilters = () => {
        setFilter({ location: "", minPrice: "", maxPrice: "" });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    if (selectedTour) {
        return (
            <TourDetails
                tour={selectedTour}
                onBack={() => setSelectedTour(null)}
            />
        );
    }

    return (
        <>
            <Alert
                message="The price of the tour will vary based on the date of booking and the number of people on the tour"
                type="info"
            />

            <div style={{ marginBottom: 16, display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Input
                    placeholder="Search by location"
                    name="location"
                    value={filter.location}
                    onChange={handleInputChange}
                    style={{ width: 200 }}
                />

                <Input
                    placeholder="Min price"
                    name="minPrice"
                    value={filter.minPrice}
                    onChange={handleInputChange}
                    type="number"
                    style={{ width: 120 }}
                />

                <Input
                    placeholder="Max price"
                    name="maxPrice"
                    value={filter.maxPrice}
                    onChange={handleInputChange}
                    type="number"
                    style={{ width: 120 }}
                />

                <Button onClick={handleResetFilters} type="default">
                    Reset Filters
                </Button>
            </div>


            <Row gutter={[16, 16]} justify="center">
                {filteredTours.map((tour) => (
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
                            onClick={() => setSelectedTour(tour)}
                        >
                            <Meta
                                title={tour.name}
                                description={`Price: $${tour.price}`}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {filteredTours.length === 0 && <div style={{ marginTop: 20 }}>No tours match the selected criteria.</div>}
        </>
    );
};

export default MyCard;
