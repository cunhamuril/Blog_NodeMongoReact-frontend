import axios from 'axios'

// const { API_URL } = process.env

export default axios.create({
  baseURL: 'http://192.168.0.102:3333'
  // baseURL: API_URL
})