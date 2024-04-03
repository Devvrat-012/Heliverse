import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/user/get-users?page=${currentPage}&limit=20`
        );
        setUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container mx-auto px-4 py-7">
      <span className="font-bold text-2xl">Users</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handlePrevClick}
          >
            Previous Page
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextClick}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Users;
