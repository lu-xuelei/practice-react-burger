import axios from 'axios';

// Create an instance of axios
const instance = axios.create ({
    baseURL: 'https://react-burger-test-a556e.firebaseio.com/'
})

export default instance;