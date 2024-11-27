import { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://127.0.0.1:3000/api';

const useUser = () => {
    const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('usuario')));
    console.log('user useUser', user);

    const fetchUser = async () => {
        const userData = JSON.parse(sessionStorage.getItem('usuario'));
        if (userData) {
            const response = await axios.get(`${API_URL}/user/detail/?id=${userData.id}`);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            sessionStorage.setItem('usuario', JSON.stringify(updatedUser));
            console.log('updatedUser useUser', updatedUser);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return user;
};

export default useUser;
