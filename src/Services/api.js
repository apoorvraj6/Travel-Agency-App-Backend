import axios from 'axios';

const API = axios.create({
  baseURL: 'https://travel-agency-app.onrender.com/api', // Base URL for your admin routes
});

// CRUD operations for packages
export const fetchPackages = () => API.get('/packages');
export const createPackage = (packageData) => API.post('/admin/packages', packageData);
export const updatePackage = (id, updatedData) => API.put(`/admin/packages/${id}`, updatedData);
export const deletePackage = (id) => API.delete(`/admin/packages/${id}`);

// Fetch all bookings
export const fetchBookings = () => API.get('/admin/bookings');
