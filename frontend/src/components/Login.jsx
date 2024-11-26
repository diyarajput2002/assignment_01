
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdContact } from "react-icons/io";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-500 to-teal-700">
      <div className="bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl shadow-lg p-6 w-96">
        <div className="text-center">
          <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
            <IoMdContact className="text-6xl" />
          </div>
          <h2 className="text-teal-500 text-2xl font-bold mb-4">SIGN IN</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p> 
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Username"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                formData.email ? "bg-white text-gray-800" : "bg-gray-800 text-gray-400"
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
                formData.password ? "bg-white text-gray-800" : "bg-gray-800 text-gray-400"
              }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center text-white text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox bg-teal-700" />
              <span className="text-teal-300 hover:underline cursor-pointer">Remember me</span>
            </label>
            <span className="text-teal-300 cursor-pointer hover:underline">Forgot your password?</span>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-bold transition duration-200"
          >
            LOGIN
          </button>
        </form>
        <p className="text-center text-white mt-6 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-teal-300 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
