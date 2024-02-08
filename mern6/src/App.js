import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import UpdateAvailability from './components/UpdateAvailability';
import FoodItemForm from './components/FoodItemForm';

function App() {

return(
   <Router>

        <div>
            <Routes>
                <Route  path = "/register" element={<Register/>}></Route>
                <Route  path = "/update-availability" element={<UpdateAvailability/>}></Route>
                <Route  path = "/food-item" element={<FoodItemForm/>}></Route>
            </Routes>
        </div>

   </Router>
    
)
};

export default App;