const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = async () => {
  try {
    // Log the Mongo URI for debugging
    console.log('MONGO_URI:', process.env.MONGO_URI);

    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB: ${connect.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = mongoDB;
