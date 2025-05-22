import React from 'react';
import { useParams } from 'react-router-dom';

const CompanyProfile = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Company Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Company ID: {id}</p>
        {/* Additional company profile content will go here */}
      </div>
    </div>
  );
};

export default CompanyProfile;