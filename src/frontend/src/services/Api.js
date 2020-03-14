import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:5050',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  // withCredentials: true,
  timeout: 30000,
});


const getWord = (params) => api.get('/api/word', params)
const writeWord = (params) => api.post('/api/word', params)
const setPass = (params) => api.post('/api/word/lock', params)

export {
  getWord,
  writeWord,
  setPass
}

