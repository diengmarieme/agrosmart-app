import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Ajoute le token automatiquement
API.interceptors.request.use(req => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export const getBassins = () => API.get('/bassins')
export const createBassin = (data) => API.post('/bassins', data)
export const updateBassin = (id, data) => API.put(`/bassins/${id}`, data)
export const deleteBassin = (id) => API.delete(`/bassins/${id}`)

export const getLapins = () => API.get('/lapins')
export const createLapin = (data) => API.post('/lapins', data)
export const updateLapin = (id, data) => API.put(`/lapins/${id}`, data)

export const getAlertes = () => API.get('/alertes')
export const createAlerte = (data) => API.post('/alertes', data)
export const marquerLu = (id) => API.put(`/alertes/${id}/lu`)

export const login = (data) => API.post('/auth/login', data)
export const register = (data) => API.post('/auth/register', data)

export default API
