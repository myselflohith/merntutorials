// FoodItemDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FoodItemDetails = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [availableStaff, setAvailableStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    const fetchFoodItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/food-items/${id}`);
        setFoodItem(response.data);
      } catch (error) {
        console.error('Error fetching food item details:', error);
      }
    };

    const fetchAvailableStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/staff/available');
        setAvailableStaff(response.data);
      } catch (error) {
        console.error('Error fetching available staff:', error);
      }
    };

    fetchFoodItemDetails();
    fetchAvailableStaff();
  }, [id]);

  const handleConfirmStatusChange = async () => {
    try {
      if (selectedStaff) {
        // Make an API request to update the status of the selected staff
        await axios.put(`http://localhost:3001/api/staff-status/${selectedStaff._id}`, {
          status: false,
        });

        // Refetch the available staff after the status change
        const response = await axios.get('http://localhost:3001/api/staff/available');
        setAvailableStaff(response.data);

        // Clear the selected staff after the status change
        setSelectedStaff(null);
      }
    } catch (error) {
      console.error('Error updating staff status:', error);
    }
  };

  return (
    <div>
      <h2>Food Item Details</h2>
      {foodItem ? (
        <div>
          <h3>{foodItem.name}</h3>
          <p>Description: {foodItem.description}</p>
          <p>Price: ${foodItem.price}</p>
          {foodItem.photo && (
            <img
              src={`http://localhost:3001/uploads/${foodItem.photo}`}
              alt={foodItem.name}
              style={{ maxWidth: '400px' }}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div>
        <h3>Available Staff</h3>
        {availableStaff.length === 0 ? (
          <p>No available staff.</p>
        ) : (
          <ul>
            {availableStaff.map((staff) => (
              <li key={staff._id}>
                <p>Name: {staff.name}</p>
                {selectedStaff && selectedStaff._id === staff._id ? (
                  <div>
                    <p>Are you sure you want to change the status of this staff?</p>
                    <button onClick={handleConfirmStatusChange}>Confirm</button>
                  </div>
                ) : (
                  <button onClick={() => setSelectedStaff(staff)}>Select Staff</button>
                )}
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodItemDetails;
