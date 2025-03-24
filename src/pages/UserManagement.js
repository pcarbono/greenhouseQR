// src/pages/UserManagement.js
 import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import FormModal from "../components/FormModal";
import Pagination from "../components/Pagination";
import usersData from "../data/greenHouse.json"; // Importamos greenhouse.json

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  // Cargar datos desde localStorage o desde greenhouse.json
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      setUsers(usersData);
      localStorage.setItem("users", JSON.stringify(usersData));
    }
  }, []);

  // Guardar en localStorage cada vez que users cambie
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const handleSaveUser = (user) => {
    let updatedUsers;
    if (currentUser) {
      updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    } else {
      updatedUsers = [...users, { ...user, id: Date.now().toString() }];
    }
    setUsers(updatedUsers);
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
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
          <h2 className="text-2xl font-semibold">Greenhouse Overview</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
          >
            Add greenhouse
          </button>
        </div>
        <Table data={currentUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
        />
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
