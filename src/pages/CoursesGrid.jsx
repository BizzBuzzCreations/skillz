import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CourseCard from "../components/custom_ui/CourseCard";
import { AuthContext } from "@/context/AuthContext";
import courseThumbnail from "@/assets/thumbnail.jpg";
import { trimWords } from "@/utils/trimWords";

const API_URL = `http://localhost:5000/api/courses`;

const CoursesGrid = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.get(API_URL);
                setCourses(res.data);
            } catch (err) {
                setError("Failed to load courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    let filteredCourses = courses;
    if (user?.role === "instructor") {
        filteredCourses = courses.filter(
            (course) => course.instructor && (course.instructor._id === user._id || course.instructor === user._id)
        );
    }
    // For admin/student, show all

    return (
        <section className="flex flex-col items-center justify-center p-5">
            <h1 className="text-3xl font-bold mb-4 text-slate-800">Trending Courses</h1>
            {loading ? (
                <div>Loading courses...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="flex flex-wrap gap-5 m-auto items-center justify-center">
                    {filteredCourses.length === 0 ? (
                        <div className="text-gray-500">No courses found.</div>
                    ) : (
                        filteredCourses.map((course, idx) => (
                            <CourseCard
                                key={course._id || idx}
                                indexKey={course._id || idx}
                                title={course.title}
                                description={trimWords(course.description)}
                                price={course.price ? `₹${course.price}` : "Free"}
                                thumbnail={course.thumbnail || courseThumbnail}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    );
};

export default CoursesGrid;
