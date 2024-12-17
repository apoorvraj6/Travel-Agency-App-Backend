import React, { useState } from 'react';
import PackageList from '../components/PackageList';
import PackageForm from '../components/PackageForm';
import BookingList from '../components/BookingList';

function AdminDashboard() {
  const [currentPackage, setCurrentPackage] = useState(null);

  const handleEdit = (pkg) => {
    setCurrentPackage(pkg);
  };

  const handleSave = () => {
    setCurrentPackage(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-lime-400">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PackageForm currentPackage={currentPackage} onSave={handleSave} />
          <PackageList onEdit={handleEdit} />
        </div>
        <BookingList />
      </div>
    </div>
  );
}

export default AdminDashboard;
