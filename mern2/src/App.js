import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
    const[name , setName] = useState(null);

    useEffect(() => {
        fetchName();

    },[])

    const fetchName = async() => {
        const response = await axios.get('http://localhost:3001/api/name')
        console.log(response.data)
        setName(response.data)
    }

return(
    <div>
        {name && <p>Name: {name}</p>}
    </div>
    
)}

export default App;