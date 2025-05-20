import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const API_URL = `http://localhost:5000/api/auth/register`;

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(API_URL, form);
      // Store user data in context. If your backend returns a token and user, adjust accordingly:
      if (res.data.user) {
        login(res.data.user);
      } else if (res.data.token) {
        // If backend returns token and user info, decode or fetch user info here
        // login(decodedUserInfo);
      } else {
        // Fallback: try to use the whole response as user
        login(res.data);
      }
      setSuccess("Account created! You can now log in.");
      setForm({ name: "", email: "", password: "", role: "student" });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-96 m-auto p-5 bg-gray-200 rounded-lg flex flex-col gap-5">
        <h2 className="text-xl text-center font-semibold">Create an account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input name="name" placeholder="Full Name" className="bg-white" value={form.name} onChange={handleChange} />
          <Input name="email" placeholder="Email" className="bg-white" value={form.email} onChange={handleChange} />
          <Input name="password" placeholder="Password" className="bg-white" type="password" value={form.password} onChange={handleChange} />
          <select name="role" className="bg-white border rounded p-2" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</Button>
        </form>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        <p className="text-sm">Already have an account: <Link to="/login" className="text-blue-600">log in</Link></p>
      </div>
    </>
  );
};

export default SignUp;