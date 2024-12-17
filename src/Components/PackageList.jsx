import React, { useEffect, useState } from 'react';
import { fetchPackages, deletePackage } from '../Services/api';

function PackageList({ onEdit }) {
  const [packages, setPackages] = useState([]);

  // Load packages on initial render and after any changes
  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const { data } = await fetchPackages();
      setPackages(data); // Update state with the latest package list
    } catch (error) {
      console.error('Error fetching packages:', error.message);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        alert('Package deleted successfully!');
        loadPackages();  // Re-fetch package list after deletion
      } catch (error) {
        console.error('Error deleting package:', error.message);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>
      <ul>
        {packages.map((pkg) => (
          <li
            key={pkg._id}
            className="flex justify-between items-center p-2 mb-2 bg-gray-700 rounded"
          >
            <span>
              <strong className="text-lime-400">{pkg.title}</strong> - ₹{pkg.price}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(pkg)}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PackageList;
