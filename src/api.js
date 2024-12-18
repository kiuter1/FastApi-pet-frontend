import axios from 'axios';

const API_URL = 'http://localhost:8000';

const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${API_URL}/user/login`, userData
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

const registerUser = async (userData) => {
    try {
        await axios.post(`${API_URL}/user/registration`, userData);
    } catch (error) {
        return error;
    }
};

const fetchUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user/me/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

const addTour = async (userData) => {
    try{
        await axios.post(`${API_URL}/user/admin/added_tour`, userData,{
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        });
    }
    catch (error) {
        console.error("Registration tour error:", error);
        return error;
    }
}





export { loginUser, registerUser, fetchUserProfile, addTour };