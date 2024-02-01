const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
    name: String,
    availability: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      from: String,
      to: String
    }],
    status: {
      type: Boolean,
      default: true // You can set the default value to true or false based on your requirement
    }
  });
  
  const Staff = mongoose.model('Staff', staffSchema);

  module.exports = Staff;