import React, { useState } from "react";
import ContentManager from "@/components/custom_ui/ContentManager";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const UploadCourse = () => {
  const [course, setCourse] = useState({});
  const { user } = useAuth();

  const API_URL = `http://localhost:5000/api/courses`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      alert("You must be logged in as an instructor to upload a course.");
      return;
    }
    // Attach instructor user id
    const courseData = { ...course, instructor: user._id };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(courseData),
      });
      if (!res.ok) throw new Error("Failed to upload course");
      alert("Course uploaded successfully!");
      // Optionally reset form or redirect
    } catch (err) {
      alert(err.message || "Error uploading course");
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Upload Course</h1>
        <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
          {/* Only show ContentManager for course details and structure */}
          <div className="mb-4">
            <ContentManager course={course} setCourse={setCourse} />
          </div>
          <Button type="submit">Upload Course</Button>
        </form>
      </div>
    </div>
  );
};

export default UploadCourse;