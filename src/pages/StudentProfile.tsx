import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentProfile = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Student Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Student ID: {id}</p>
        {studentData && (
          <div>
            {/* Display student data here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;