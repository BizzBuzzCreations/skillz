import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { ChevronRight } from "lucide-react";
import courseThumbnail from "@/assets/thumbnail.jpg";

const UnitCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading course...</div>;
  if (error || !course) return <div className="p-10 text-center text-red-500">{error || "Course not found"}</div>;

  return (
    <div className="container m-auto">
      <section className="flex md:flex-row flex-col-reverse items-center justify-center px-10 py-5 gap-10">
        <div className="flex-1 space-y-3 mt-5">
          <h2 className="text-3xl font-medium">{course.title}</h2>
          <p className="text-lg">{course.description}</p>
          <Button onClick={() => navigate(`${location.pathname}/player`)}>Start Learning <ChevronRight /></Button>
        </div>
        <div className="flex-1 bg-gray-100 p-3 rounded-xl shadow-md">
          <img src={course.thumbnail || courseThumbnail} alt="course video" className="rounded-xl" />
        </div>
      </section>

      {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
        <section className="text-center p-10">
          <h2 className="text-xl font-semibold">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center m-auto gap-5 mt-5 w-[80%] mx-auto">
            {course.whatYouWillLearn.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <FaRegCircleCheck className="text-blue-500 text-xl drop-shadow-md" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {course.skillsYouWillGain && course.skillsYouWillGain.length > 0 && (
        <section className="text-center p-10">
          <h2 className="text-xl font-semibold">Skills You'll Gain</h2>
          <div className="flex flex-wrap justify-center items-center m-auto gap-5 mt-5 w-[80%] mx-auto">
            {course.skillsYouWillGain.map((skill, idx) => (
              <Badge key={idx} variant="outline" className="p-1 px-3 text-sm bg-gray-200">{skill}</Badge>
            ))}
          </div>
        </section>
      )}

      {course.courseStructure && course.courseStructure.length > 0 && (
        <section className="text-center p-10">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="flex flex-wrap justify-center items-center m-auto gap-2 mt-5 w-[80%] mx-auto">
            {course.courseStructure.map((mod, idx) => (
              <Accordion key={idx} type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col gap-1 !w-[100%]">
                      <p className="text-lg text-gray-800">{mod.moduleTitle}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Module {idx + 1}</span>
                        {mod.moduleDescription && <><LuDot /> <span>{mod.moduleDescription}</span></>}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {mod.topics && mod.topics.length > 0 && (
                      <ul className="list-disc ml-6 text-left">
                        {mod.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="mb-2">
                            <span className="font-semibold">{topic.topicTitle}</span>
                            {topic.topicDescription && <>: {topic.topicDescription}</>}
                            {topic.videoUrls && topic.videoUrls.length > 0 && (
                              <ul className="list-decimal ml-6 text-xs text-gray-600">
                                {topic.videoUrls.map((url, vIdx) => (
                                  <li key={vIdx}>{url}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default UnitCourse;