import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

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
  const [message, setMessage] = useState(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        setFileUploadError(true);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
        } catch (error) {
          console.error("Download URL error:", error);
          setFileUploadError(true);
        }
      }
    );
  };

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const res = await axios.post("/user/create-user", formDataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      const data = res.data;
      if (data.success === false) {
        setErrors(data.message);
      }
      setMessage("User Created Successfully!");
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <span className="font-bold text-2xl">Create a User</span>
      <form
        onSubmit={handleSubmit}
        className="px-8 md:px-40 md:flex md:flex-row md:gap-10 md:items-center lg:px-80"
      >
        <div>
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
        </div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="avatar" className="text-gray-700 font-bold">
              Avatar:
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              accept="image/*"
              type="file"
              ref={fileRef}
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || "profilePic.jpg"}
              alt="profilePhoto"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
            />
            <p className="text-sm self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image upload! (Image must be less than 2 MB!)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
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
        </div>
      </form>
      {message && !errors && <span>{message}</span>}
    </div>
  );
}

export default CreateUser;
