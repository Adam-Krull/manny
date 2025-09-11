import axios from 'axios';

const base_api = 'http://127.0.0.1:8000/'

export const makeQuery = async ({ query }) => {
    const response = await axios.post(base_api, query);
    return response.data;
};