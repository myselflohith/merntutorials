// FoodItemForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FoodItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    photo: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, description, price, photo } = formData;

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', name);
      formDataToSubmit.append('description', description);
      formDataToSubmit.append('price', price);
      formDataToSubmit.append('photo', photo);

      await axios.post('http://localhost:3001/api/food-items', formDataToSubmit);

      console.log('Food item added successfully');
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error adding food item:', error);
      // Handle error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>Add Food Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        <label>Photo:</label>
        <input type="file" name="photo" onChange={handleFileChange} accept="image/*" required />
        <button type="submit">Add Food Item</button>
      </form>
    </div>
  );
};

export default FoodItemForm;
