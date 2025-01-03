import axios from 'axios';

const API_URL = 'http://localhost:8000';

const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${API_URL}/user/login`, userData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const registerUser = async (userData) => {
    try {
        await axios.post(`${API_URL}/user/registration`, userData);
    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
    }
}

const getTours  = async () => {
    try{
        const response = await axios.get(`${API_URL}/user/tours`,)
        return  response.data
    }
    catch (error) {
        console.error("get tours error:", error);
        throw error;
    }
}

const delTour  = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/user/admin/deleted_tour`, userData,{
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        return  response.data
    }
    catch (error) {
        console.error("delete tours error:", error);
        throw error;
    }
}

const editTour  = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/user/admin/edit_tour`, userData,{
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        return  response.data
    }
    catch (error) {
        console.error("edit tours error:", error);
        throw error;
    }
}

const addOrder = async (userData) => {
    try{
        await axios.post(`${API_URL}/user/create_order`, userData,{
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        });
    }
    catch (error) {
        console.error("Order created error:", error);
        throw error;
    }
}


export { loginUser, registerUser, fetchUserProfile, addTour, getTours, delTour, editTour, addOrder };