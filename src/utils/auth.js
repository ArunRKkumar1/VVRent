import axios from 'axios';

const isTokenValid = async(token) => {    
    try {
        const response = await axios.get('http://3.110.143.52:8000/api/v1/admin/valid-token', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

export { isTokenValid }; 
