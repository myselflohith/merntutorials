// UpdateAvailability.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAvailability = ({ setStaffList }) => {
  const [name, setName] = useState('');
  const [day, setDay] = useState('Monday');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [staffList, setStaffListLocal] = useState([]);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/staff');
      setStaffListLocal(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);

  const handleUpdateAvailability = async () => {
    try {
      const selectedStaff = staffList.find((staff) => staff.name === name);
      
      if (!selectedStaff) {
        console.error('Selected staff not found.');
        return;
      }

      // Update availability in the local state (optimistic update)
      const updatedStaffList = staffList.map((staff) =>
        staff.name === name
          ? { ...staff, availability: [...staff.availability, { day, from, to }] }
          : staff
      );
      setStaffListLocal(updatedStaffList);

      // Update availability in the database
      await axios.put(`http://localhost:3001/api/staff/${selectedStaff._id}`, {
        availability: selectedStaff.availability.concat({ day, from, to })
      });

      console.log('Availability updated successfully.');
      fetchStaffList(); // Refetch the updated staff list from the database
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <div>
      <h2>Update Availability</h2>
      <div>
        <label>Select Staff:</label>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option value="" disabled>Select Staff</option>
          {staffList.map((staff) => (
            <option key={staff._id} value={staff.name}>
              {staff.name}
            </option>
          ))}
        </select>
      </div>
      {name && (
        <div>
          <h3>Set Availability for {name}</h3>
          <div>
            <label>Day:</label>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label>From:</label>
            <input type="time" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label>To:</label>
            <input type="time" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <button onClick={handleUpdateAvailability}>Update Availability</button>
        </div>
      )}
    </div>
  );
};

export default UpdateAvailability;
