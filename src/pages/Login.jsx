import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const API_URL = `http://localhost:5000/api/auth/login`;

const LogIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(API_URL, form, { withCredentials: true });
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
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-96 m-auto p-5 bg-gray-200 rounded-lg flex flex-col gap-5">
        <h2 className="text-xl text-center font-semibold">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input name="email" placeholder="Email" className="bg-white" value={form.email} onChange={handleChange} />
          <Input name="password" placeholder="Password" className="bg-white" type="password" value={form.password} onChange={handleChange} />
          <Button type="submit" disabled={loading}>{loading ? "Logging In..." : "Log In"}</Button>
        </form>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <p className="text-sm">Create new account: <Link to="/signup" className="text-blue-600">sign up</Link></p>
      </div>

    </>
  )
}

export default LogIn;