// import { QRCodeSVG } from "qrcode.react";
// import { Link } from "react-router-dom";

// const Table = ({ data = [], onEdit, onDelete }) => {
//   return (
//     <table className="w-full border-collapse border border-gray-300">
//       <thead>
//            <tr className="bg-blue-500 text-white">
//              <th className="py-2 px-4 text-left">Location</th>
//              <th className="py-2 px-4 text-left">Supplier</th>
//              <th className="py-2 px-4 text-left">Next Change</th>
//              <th className="py-2 px-4 text-left">QR Code</th>
//              <th className="py-2 px-4 text-center">Actions</th>
//            </tr>
//          </thead>
//       <tbody>
//         {data.length > 0 ? (
//           data.map((user) => (
//             <tr key={user.id}>
//               {/* Enlace en la primera columna */}
//               <td className="border p-2">
//                 <Link to={`/user/${user.id}`} className="text-blue-500 underline">
//                   {user.name}
//                 </Link>
//               </td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2">{user.phone}</td>
//               <td className="border p-2 flex justify-center">
//                 <QRCodeSVG
//                   value={`${window.location.origin}/user/${user.id}`}
//                   size={64}
//                   alt={`QR Code for ${user.name}`}
//                 />
//               </td>
//               <td className="border p-2 text-center">
//                 {/* Botón Edit */}
//                 <button
//                   onClick={() => onEdit(user)}
//                   className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded mx-1"
//                 >
//                   Edit
//                 </button>
//                 {/* Botón Delete */}
//                 <button
//                   onClick={() => onDelete(user.id)}
//                   className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded mx-1"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="5" className="text-center p-4 text-gray-500">
//               No users found.
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default Table;

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";

const Table = ({ data = [], onEdit, onDelete }) => {
  const [selectedQR, setSelectedQR] = useState(null); // Estado para manejar el QR seleccionado

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Supplier</th>
            <th className="py-2 px-4 text-left">Next Change</th>
            <th className="py-2 px-4 text-left">QR Code</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user.id}>
                {/* Enlace en la primera columna */}
                <td className="border p-2">
                  <Link to={`/user/${user.id}`} className="text-blue-500 underline">
                    {user.name}
                  </Link>
                </td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2 flex justify-center">
                  {/* Hacer clic en el QR para ampliarlo */}
                  <QRCodeSVG
                    value={`${window.location.origin}/user/${user.id}`}
                    size={64}
                    className="cursor-pointer"
                    onClick={() => setSelectedQR(`${window.location.origin}/user/${user.id}`)}
                  />
                </td>
                <td className="border p-2 text-center">
                  {/* Botón Edit */}
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded mx-1"
                  >
                    Edit
                  </button>
                  {/* Botón Delete */}
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para ampliar QR */}
      {selectedQR && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedQR(null)} // Cerrar modal al hacer clic fuera
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-center mb-2">QR Code</h2>
            <QRCodeSVG value={selectedQR} size={256} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
