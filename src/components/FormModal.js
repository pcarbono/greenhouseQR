// src/components/FormModal.js
import React, { useState, useEffect } from "react";

const FormModal = ({ show, onClose, onSave, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Location is required";
    if (!email) newErrors.email = "Supplier is required";
    if (!phone) {
      newErrors.phone = "NextChange is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(phone)) {
      newErrors.phone = "Date must be in format YYYY-MM-DD";
    }
    return newErrors;
  };

  const handleSave = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSave({ id: user ? user.id : Date.now(), name, email, phone });
    } else {
      setErrors(formErrors);
    }
  };

  return show ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4">{user ? "Edit User" : "Add User"}</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Location</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Supplier</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Next Change</label>
          <input
            type="data"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default FormModal;
