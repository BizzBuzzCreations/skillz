import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import axios from "axios";


const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);

  const API_URL = `http://localhost:5000/api/courses/${id}`;

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(API_URL);
        setCourse(res.data);
        console.log(res.data);
        // Find first video URL in course content or structure
        let firstVideo = null;
        if (res.data.content && res.data.content.length > 0) {
          for (const section of res.data.content) {
            if (section.resources && section.resources.length > 0) {
              const videoRes = section.resources.find(r => r.type === 'video' && r.url);
              if (videoRes) {
                firstVideo = videoRes.url;
                break;
              }
            }
          }
        }
        if (!firstVideo && res.data.courseStructure && res.data.courseStructure.length > 0) {
          for (const mod of res.data.courseStructure) {
            if (mod.topics && mod.topics.length > 0) {
              for (const topic of mod.topics) {
                if (topic.videoUrls && topic.videoUrls.length > 0) {
                  firstVideo = topic.videoUrls[0];
                  break;
                }
              }
            }
            if (firstVideo) break;
          }
        }
        setCurrentVideo(firstVideo);
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

  // Sidebar: only use courseStructure for sidebar items
  let sidebarItems = [];
  if (course.courseStructure && course.courseStructure.length > 0) {
    course.courseStructure.forEach((mod, mIdx) => {
      if (mod.topics && mod.topics.length > 0) {
        mod.topics.forEach((topic, tIdx) => {
          if (topic.videoUrls && topic.videoUrls.length > 0) {
            topic.videoUrls.forEach((url, vIdx) => {
              sidebarItems.push({
                title: topic.topicTitle || `Topic ${tIdx + 1}`,
                sectionTitle: null,
                url,
                duration: null,
                module: mod.moduleTitle,
                topic: topic.topicTitle,
              });
            });
          }
        });
      }
    });
  }

  // Group sidebar items by module to avoid module repetition
  const groupedSidebar = [];
  let lastModule = null;
  sidebarItems.forEach((item, idx) => {
    if (item.module) {
      if (lastModule !== item.module) {
        groupedSidebar.push({ type: 'module', name: item.module });
        lastModule = item.module;
      }
      groupedSidebar.push({ ...item, type: 'topic' });
    }
  });

  // Find the sidebar item for the current video
  const currentSidebarItem = sidebarItems.find(item => item.url === currentVideo);

  // Find module, topic, and resources for the current video
  let moduleTitle = '', topicTitle = '', topicDescription = '', topicResources = [];
  if (currentSidebarItem) {
    // If from courseStructure (has module)
    if (currentSidebarItem.module && course.courseStructure) {
      const mod = course.courseStructure.find(m => m.moduleTitle === currentSidebarItem.module);
      if (mod && mod.topics) {
        const topic = mod.topics.find(t => t.topicTitle === currentSidebarItem.topic);
        if (topic) {
          moduleTitle = mod.moduleTitle;
          topicTitle = topic.topicTitle;
          topicDescription = topic.topicDescription || '';
          // Find resources for this topic from content
          if (course.content && course.content.length > 0) {
            course.content.forEach(section => {
              if (section.resources && section.resources.length > 0) {
                section.resources.forEach(res => {
                  if (res.title === topic.topicTitle) {
                    topicResources.push(res);
                  }
                });
              }
            });
          }
        }
      }
    }
    // If from content (has sectionTitle)
    if (!topicTitle && currentSidebarItem.sectionTitle && course.content) {
      const section = course.content.find(s => s.sectionTitle === currentSidebarItem.sectionTitle);
      if (section && section.resources) {
        const res = section.resources.find(r => r.url === currentSidebarItem.url);
        if (res) {
          topicTitle = res.title;
          topicDescription = res.description || '';
          moduleTitle = section.sectionTitle;
          topicResources = [res];
        }
      }
    }
  }

  return (
    <div className="container m-auto flex flex-1 gap-10 px-10 py-5">
      <section className="flex-1">
        {currentVideo ? (
          <iframe
            className="w-full rounded-lg"
            width="560"
            height="560"
            src={currentVideo}
            title="Course video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="text-gray-500">No video available for this course.</div>
        )}
        <section className="mt-5">
          {moduleTitle && <h3 className="text-lg font-semibold text-blue-700 mb-1">Module: {moduleTitle}</h3>}
          <h2 className="text-2xl font-bold">{topicTitle}</h2>
          {topicDescription && <p className="mb-2 text-gray-700">{topicDescription}</p>}
          {topicResources.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Resources for this Topic:</h4>
              <ul className="list-disc ml-6">
                {topicResources.map((res, idx) => (
                  <li key={idx} className="mb-1">
                    <span className="font-semibold">{res.title}</span>
                    {res.type && <span className="ml-2 text-xs text-gray-500">[{res.type}]</span>}
                    {res.url && res.type === 'pdf' && (
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">View PDF</a>
                    )}
                    {res.url && res.type === 'text' && (
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">View Text</a>
                    )}
                    {res.duration && res.type === 'video' && (
                      <span className="ml-2 text-xs text-gray-400">({res.duration} min)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </section>
      <section className="w-64 flex flex-col gap-3">
        {groupedSidebar.length === 0 ? (
          <div className="text-gray-500">No video lessons found.</div>
        ) : (
          groupedSidebar.map((item, idx) => {
            if (item.type === 'module') {
              return (
                <div key={idx} className="font-bold text-blue-700 mt-2 mb-1 text-base border-b pb-1">{item.name}</div>
              );
            }
            // topic
            return (
              <div
                key={idx}
                className={`bg-gray-100 p-3 rounded-md cursor-pointer ${currentVideo === item.url ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => setCurrentVideo(item.url)}
              >
                <h4 className="font-semibold">{item.title}</h4>
                <div className="flex items-center text-sm text-gray-600">
                  {item.topic && <small>{item.topic}</small>}
                  {item.topic && <LuDot />}
                  <small>{item.duration ? `${item.duration} min` : null}</small>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default CoursePlayer;