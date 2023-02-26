const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const dBUrl = 'mongodb+srv://mateolohezic:residentevil@xeev.dz8q0oq.mongodb.net/?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    await mongoose.connect(dBUrl);
    console.log('Conectada')
  } catch (error) {
    console.log('No Conectada')
  }
}

connectDB();
module.exports = { connectDB }