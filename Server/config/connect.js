const mongoose = require('mongoose');

const connectDB = () => {
  const uri =
    process.env.MONGO_DB || process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      'Missing MongoDB connection string. Set MONGO_DB or MONGO_URI or MONGODB_URI in your environment.'
    );
    process.exit(1);
  }

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectDB;