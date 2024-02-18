import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/staff/${id}`);
      // If successful, update the staff list by refetching it
      fetchStaffList();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <div>
      <h2>Staff List</h2>
      {staffList.length === 0 ? (
        <p>No staff members available.</p>
      ) : (
        <ul>
          {staffList.map((staff) => (
            <li key={staff._id}>
              {staff.name}
              <button onClick={() => handleDeleteStaff(staff._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaffList;
