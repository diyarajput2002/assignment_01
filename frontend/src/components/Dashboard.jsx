
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / rowsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, {user?.name || "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="p-6">
          <table className="min-w-full ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                  #
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                  Date Created
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
            {currentUsers.length > 0 ? (
                currentUsers.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700 border-b">
                      {startIndex + idx + 1}
                    </td>
                    <td className="px-6 py-2 text-sm  text-gray-700 border-b">      
                  {user.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b">
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.role || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "Suspended"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status || "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-500 hover:underline"
                          title="Edit"
                        >
                          <IoSettingsOutline />
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          title="Delete"
                        >
                        <RxCross2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-sm text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {endIndex > users.length ? users.length : endIndex} of{" "}
              {users.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === 1
                    ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(users.length / rowsPerPage)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === Math.ceil(users.length / rowsPerPage)
                    ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
