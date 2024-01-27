import React, { useState } from 'react';
import axios from 'axios';

const Register =() =>{

    const [formData, setFormData] = useState({
        username: 'mark',
        email:'mark@gmail.com',
        password: 'password'
    })

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const regres  = await axios.post('http://localhost:3001/api/register', formData);
            console.log(regres.status)
        }
        catch(error){
            console.log('errror during reg')
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    username:
                </label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label>
                    email:
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>
                    password:
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type ="submit"> Register</button>
            </form>
        </div>

    )
};

export default Register;
