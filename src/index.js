const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pinRouter = require("./routes/pin");
const userRouter = require("./routes/user");

dotenv.config();

// Create an Express app
const app = express();
app.use(express.json());
// MongoDB connection URI (replace 'your-db-uri' with your actual MongoDB URI)
const mongoURI =process.env.MONGO_URI;



// Connect to MongoDB
mongoose.connect(mongoURI , {
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

app.use("/api/pins",pinRouter)
app.use("/api/users",userRouter)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
