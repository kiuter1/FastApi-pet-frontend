import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser, fetchUserProfile, registerUser, addTour, delTour, editTour, addOrder} from '../api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await fetchUserProfile(token);
                setUser(user);
            };
            getUser();
        }
    }, [token]);

    const login = async (username, password) => {
        const response = await loginUser({ username, password });
        if (response?.access_token) {
            setToken(response.access_token);
            localStorage.setItem('token', response.access_token);
            const userProfile = await fetchUserProfile(response.access_token);
            setUser(userProfile);
            navigate('/profile');
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
    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, addedTour, deleteTour, editedTour, addedOrder }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider, AuthContext}