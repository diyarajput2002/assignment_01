
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdContact } from "react-icons/io";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-500 to-teal-700">
      <div className="bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl shadow-lg p-6 w-96">
        <div className="text-center">
          <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
          <IoMdContact  className="text-6xl"/>
          </div>
          <h2 className="text-teal-500 text-2xl font-bold mb-4">REGISTER</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                formData.dateOfBirth ? "bg-white text-gray-800" : "bg-gray-800 text-gray-400"
              }`}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="dateOfBirth"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                formData.dateOfBirth ? "bg-white text-gray-800" : "bg-gray-800 text-gray-400"
              }`}
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                formData.dateOfBirth ? "bg-white text-gray-800" : "bg-gray-800 text-gray-400"
              }`}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                formData.dateOfBirth ? "bg-white text-gray-800" : "bg-gray-800 text-gray-400"
              }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-bold transition duration-200"
          >
            REGISTER
          </button>
        </form>
        <p className="text-center text-white mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-teal-300 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
