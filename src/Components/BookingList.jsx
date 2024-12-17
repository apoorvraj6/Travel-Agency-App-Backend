import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../Services/api';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { data } = await fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md mt-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Travelers</th>
              <th className="px-4 py-2 text-left">Special Requests</th>
              <th className="px-4 py-2 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-gray-600">
                <td className="px-4 py-2">{booking.name}</td>
                <td className="px-4 py-2">{booking.email}</td>
                <td className="px-4 py-2">{booking.phoneNumber}</td>
                <td className="px-4 py-2">{booking.numberOfTravelers}</td>
                <td className="px-4 py-2">{booking.specialRequest || 'None'}</td>
                <td className="px-4 py-2">₹{booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingList;
