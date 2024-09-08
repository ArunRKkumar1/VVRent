import axios from 'axios';
const BASE_URL = 'http://3.110.143.52:8000/api/v1'


const GET =  async (url, body={}) => {
    try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          data:body,  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return  response;
      } catch (error) {
        throw  error;
      }
}
const POST = async (url, data) => {
    try {
        const response = await axios.post(`${BASE_URL}${url}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return  response;
      } catch (error) {
        throw  await error.response;
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
        return  response;
      } catch (error) {
        throw  error;
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
        return  response;
      } catch (error) {
        throw  error;
      }
}

export {
    GET,
    POST,
    PUT,
    DELETE
}