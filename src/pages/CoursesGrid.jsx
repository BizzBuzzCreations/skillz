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
                        filteredCourses.map((course, idx) => {
                            const canModify = user && (user.role === "admin" || (user.role === "instructor" && (course.instructor && (course.instructor._id === user._id || course.instructor === user._id))));
                            return (
                                <div key={course._id || idx} className="relative">
                                    <CourseCard
                                        indexKey={course._id || idx}
                                        title={course.title}
                                        description={trimWords(course.description)}
                                        price={course.price ? `₹${course.price}` : "Free"}
                                        thumbnail={course.thumbnail || courseThumbnail}
                                    />
                                    {canModify && (
                                        <a
                                            href={`/course/${course._id}/modify`}
                                            className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600 transition text-xs z-10"
                                        >
                                            Modify
                                        </a>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </section>
    );
};

export default CoursesGrid;
