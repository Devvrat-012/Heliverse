import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Agender', 'Bigender', 'Non-binary', 'Genderqueer', 'Polygender', 'Genderfluid'],
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1711929600&semt=ais',
  },
  domain: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true }); 

const User = mongoose.model("Heliverse-User", userSchema);

export default User;
