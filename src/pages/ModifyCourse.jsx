import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentManager from "@/components/custom_ui/ContentManager";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const API_URL = `http://localhost:5000/api/courses`;

const ModifyCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setError(err.message || "Error loading course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token || !user._id) {
      alert("You must be logged in as an instructor or admin to modify a course.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...course, instructor: course.instructor?._id || course.instructor }),
      });
      if (!res.ok) throw new Error("Failed to update course");
      alert("Course updated successfully!");
      navigate(`/course/${id}`);
    } catch (err) {
      alert(err.message || "Error updating course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading course...</div>;
  if (error || !course) return <div className="p-10 text-center text-red-500">{error || "Course not found"}</div>;

  // Only allow admin or instructor (who owns the course) to edit
  const instructorId = typeof course.instructor === 'object' && course.instructor !== null
    ? course.instructor._id
    : course.instructor;
  if (!(user && (user.role === "admin" || (user.role === "instructor" && String(instructorId) === String(user._id))))) {
    return <div className="p-10 text-center text-red-500">You do not have permission to modify this course.</div>;
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Modify Course</h1>
        <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="mb-4">
            <ContentManager course={course} setCourse={setCourse} />
          </div>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
        </form>
      </div>
    </div>
  );
};

export default ModifyCourse;
