// src/pages/UserManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import FormModal from "../components/FormModal";
import Pagination from "../components/Pagination";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const usersPerPage = 7;

  useEffect(() => {
    setLoading(true); // Set loading to true before the request
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const apiUsers = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        }));
        setUsers(apiUsers);
        setError(null);
        setLoading(false); // Set loading to false after the data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        setError("Failed to fetch user data. Please try again later.");
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const handleSaveUser = (user) => {
    if (currentUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, user]);
    }
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">User Management</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
        )}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : (
          <>
            <Table
              data={currentUsers}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(users.length / usersPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <FormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveUser}
        user={currentUser}
      />
    </div>
  );
};

export default UserManagement;
