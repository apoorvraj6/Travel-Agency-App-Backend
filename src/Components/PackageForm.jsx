import React, { useState, useEffect } from 'react';
import { createPackage, updatePackage } from '../Services/api';

function PackageForm({ currentPackage, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    image: '',
  });

  // Format the date entered by the user (dd/mm/yyyy) to ISO format (yyyy-mm-dd)
  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  // Set the form data only when the currentPackage changes
  useEffect(() => {
    if (currentPackage && currentPackage._id !== formData._id) {
      setFormData(currentPackage);  // Update formData with currentPackage details
    }
  }, [currentPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure price is stored as a string
    formData.price = formData.price.toString();

    // Format availableDates to yyyy-mm-dd if provided
    if (formData.availableDates) {
      formData.availableDates = formatDate(formData.availableDates);
    }

    try {
      if (currentPackage) {
        await updatePackage(currentPackage._id, formData);
        alert('Package updated successfully!');
      } else {
        await createPackage(formData);
        alert('Package created successfully!');
      }

      // Clear the form fields after successful submission
      setFormData({
        title: '',
        description: '',
        price: '',
        availableDates: '',
        image: '',
      });

      onSave();  // Refresh the parent component with the new or updated data
    } catch (error) {
      console.error('Error saving package:', error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mb-4 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">
        {currentPackage ? 'Edit Package' : 'Create Package'}
      </h2>
      <div className="space-y-2">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="text"  // Ensure the price stays as a string
          required
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          name="availableDates"
          value={formData.availableDates}
          onChange={handleChange}
          placeholder="Available Dates (dd/mm/yyyy)"
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded font-bold w-full"
        >
          {currentPackage ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  );
}

export default PackageForm;
