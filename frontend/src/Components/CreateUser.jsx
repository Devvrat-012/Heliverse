import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CreateUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    availability: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const validationErrors = {};
    if (!formData.firstName) {
      validationErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      validationErrors.lastName = "Last Name is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid Email format";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        try {
            const res = await axios.post("/user/create-user", formData, {
                headers: { 'Content-Type': 'application/json' }
              });
            const data = res.data;
            if (data.success === false) {
              setErrors(data.message);
            }
            setMessage("User Created Successfully!")
            setTimeout(() => {
              navigate("/posts");
          }, 1000);
          } catch (error) {
            setErrors(error.message);
          }
      
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <form onSubmit={handleSubmit} className="px-8 md:px-40 lg:px-80">
        <div className="flex flex-col mb-4">
          <label htmlFor="firstName" className="text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="lastName" className="text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="gender" className="text-gray-700 font-bold mb-2">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Agender">Agender</option>
            <option value="Bigender">Bigender</option>
            <option value="Polygender">Polygender</option>
            <option value="Non-binary">Non Binary</option>
            <option value="Genderqueer">Genderqueer</option>
            <option value="Genderfluid">Genderfluid</option>
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="avatar" className="text-gray-700 font-bold mb-2">
            Avatar URL:
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="domain" className="text-gray-700 font-bold mb-2">
            Domain:
          </label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="availability"
            className="text-gray-700 font-bold mb-2"
          >
            Availability:
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Available?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && !errors && <span>{message}</span>}
    </div>
  );
}

export default CreateUser;
