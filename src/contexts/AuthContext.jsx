import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser, fetchUserProfile, registerUser, addTour, delTour, editTour, addOrder, getUsers, toggleAdminApi, getOrders, updateOrderStatusAPI, delOrder} from '../api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await fetchUserProfile(token);
                setUser(user);
            };
            getUser();
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await fetchUserProfile(token);
                setUser(user);
                setIsAuthenticated(true);
            };
            getUser();
        }
    }, []);

    const login = async (username, password) => {
        const response = await loginUser({ username, password });
        if (response?.access_token) {
            setToken(response.access_token);
            localStorage.setItem('token', response.access_token);
            const userProfile = await fetchUserProfile(response.access_token);
            setUser(userProfile);
            setIsAuthenticated(true);
            navigate('/tours');
        } else {
            return response;
        }
    };

    const register = async (username, email, password) => {
        const error =  registerUser({ username, email, password });
        if (error) return error;
        navigate('/login');

    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };


    const addedTour = async (name, location, description, price, photo) => {
        const token = localStorage.getItem('token')
        const error =  addTour({ name, location, description, price, photo, token });
        if (error) return error;
        navigate('/admin');

    };


    const deleteTour = async (id) => {
        const token = localStorage.getItem('token')
        return await delTour({id, token});
    }

    const editedTour = async (id, name, location, description, price, photo) => {
        const token = localStorage.getItem('token')
        return await editTour({id, name, location, description, price, photo, token});
    }

    const addedOrder = async (fullName, contact, people, comments, tour_id) => {
        const token = localStorage.getItem('token')
        return await addOrder({fullName, contact, people, comments, tour_id, token});
    }

    const getUser = async () => {
        const token = localStorage.getItem('token')
        return await getUsers({token});
    }

    const toggleAdmin = async (id, is_admin) =>{
        const token = localStorage.getItem('token')
        return await toggleAdminApi({id, is_admin, token});
    }

    const getOrder = async () => {
        const token = localStorage.getItem('token')
        return await getOrders({token});
    }

    const updateOrderStatus =  async (id, is_done) =>{
        const token = localStorage.getItem('token')
        return await updateOrderStatusAPI({id, is_done, token});
    }

    const deleteOrder =  async (id) =>{
        const token = localStorage.getItem('token')
        return await delOrder({id, token});
    }

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, addedTour, deleteTour, editedTour, addedOrder, getUser, toggleAdmin, getOrder, updateOrderStatus, deleteOrder, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider, AuthContext}