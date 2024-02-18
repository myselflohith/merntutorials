import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import UpdateAvailability from './components/UpdateAvailability';
import FoodItemForm from './components/FoodItemForm';
import FoodItemList from './components/FoodItemList';
import FoodItemDetails from './components/FoodItemDetails';
import StaffList from './components/DelStaff';

function App() {

return(
   <Router>

        <div>
            <Routes>
                <Route  path = "/register" element={<Register/>}></Route>
                <Route  path = "/update-availability" element={<UpdateAvailability/>}></Route>
                <Route  path = "/food-item" element={<FoodItemForm/>}></Route>
                <Route  path = "/food-items" element={<FoodItemList/>}></Route>
                <Route  path = "/food-items/:id" element={<FoodItemDetails/>}></Route>
                <Route  path = "/del-staff" element={<StaffList/>}></Route>
            </Routes>
        </div>

   </Router>
    
)
};

export default App;