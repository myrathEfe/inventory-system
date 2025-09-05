import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

// Axios instance oluştur
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - JWT token ekle
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Hata yönetimi
api.interceptors.response.use(
    (response) => response.data,   // sadece data dön
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


// Auth API
export const authAPI = {
    register: (userData) => api.post('/register', userData).then(res => res.data),
// Doğru: Promise'i döndürüyor.
    login: (credentials) => {
        return api.post('/login', credentials);
    },};


// Products API
export const productsAPI = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/product/${id}`),
    create: (productData) => api.post('/product', productData),
    update: (id, productData) => api.put(`/product/${id}`, productData),
    delete: (id) => api.delete(`/product/${id}`),
};

// Orders API
export const ordersAPI = {
    getAll: () => api.get('/orders'),
    getById: (id) => api.get(`/order/${id}`),
    create: (orderData) => api.post('/create-order', orderData),
    update: (id, orderData) => api.put(`/order/${id}`, orderData),
    delete: (id) => api.delete(`/order/${id}`),
};

export default api;