import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/v1'


const GET =  async (url, body) => {
    try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          data:body,  
          params,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return  Promise.resolve(response);
      } catch (error) {
        return  Promise.reject(error);
      }
}
const POST = async (url, data) => {
    try {
        const response = await axios.post(`${BASE_URL}${url}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return  Promise.resolve(response);
      } catch (error) {
        console.log(error);
        return  Promise.reject(error.response.data);
      }
}
const PUT = async (url, body) => {
    try {
        const response = await axios.put(`${BASE_URL}${url}`, body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return  Promise.resolve(response);
      } catch (error) {
        return  Promise.reject(error);
      }
}
const DELETE = async (url) => {
    try {
        const response = await axios.delete(`${BASE_URL}${url}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return  Promise.resolve(response);
      } catch (error) {
        return  Promise.reject(error);
      }
}

export {
    GET,
    POST,
    PUT,
    DELETE
}