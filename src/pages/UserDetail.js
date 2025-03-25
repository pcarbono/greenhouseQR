// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserDetail = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Obtener los usuarios desde localStorage
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     // Buscar el usuario específico por ID
//     const foundUser = storedUsers.find((u) => u.id === userId);
//     setUser(foundUser);
//   }, [userId]);

//   if (!user) {
//     return <h2 className="text-red-500">Green House no found</h2>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{user.name}</h1>
//       <p>Supplier: {user.email}</p>
//       <p>Next Change: {user.phone}</p>
//     </div>
//   );
// };

// export default UserDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {QRCodeSVG} from "qrcode.react";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((u) => u.id === userId);
    setUser(foundUser);
  }, [userId]);

  if (!user) {
    return <h2 className="text-red-500">Usuario no encontrado</h2>;
  }

  const userURL = `${window.location.origin}/user/${user.id}`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Location: {user.email}</p>
      <p>Next Change: {user.phone}</p>

      {/* Código QR
      <div className="mt-4">
        <h3 className="text-lg font-semibold">QR Code:</h3>
        <QRCodeSVG value={userURL} size={128} />
      </div> */}
    </div>
  );
};

export default UserDetail;


