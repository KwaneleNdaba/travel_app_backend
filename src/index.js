const express = require('express');
const mongoose = require('mongoose');

// Create an Express app
const app = express();

// MongoDB connection URI (replace 'your-db-uri' with your actual MongoDB URI)
const mongoURI = 'mongodb+srv://kwanelendaba113:LTSNsskk113@cluster0.z5iwho0.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI + "travel_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
  // You can start defining your schemas and models or perform other operations here
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
