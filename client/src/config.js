import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'https://reactblog-sakeer.herokuapp.com/api'
})

export const PF = 'https://reactblog-sakeer.herokuapp.com/images/resized/'


// https://reactblog-sakeer.herokuapp.com/