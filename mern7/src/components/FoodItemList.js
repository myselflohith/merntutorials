// FoodItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/food-items');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div>
      <h2>Food Items</h2>
      {foodItems.length === 0 ? (
        <p>No food items available.</p>
      ) : (
        <ul>
          {foodItems.map((foodItem) => (
            <li key={foodItem._id}>
              <h3>{foodItem.name}</h3>
              <p>Description: {foodItem.description}</p>
              <p>Price: ${foodItem.price}</p>
              {foodItem.photo && (
                <Link to={`/food-items/${foodItem._id}`}>
                  <img
                    src={`http://localhost:3001/uploads/${foodItem.photo}`}
                    alt={foodItem.name}
                    style={{ maxWidth: '200px', cursor: 'pointer' }}
                  />
                </Link>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default FoodItemList;
