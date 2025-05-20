import React, { useState } from "react";
import ContentManager from "@/components/custom_ui/ContentManager";
import Editor from "@/components/custom_ui/Editor";
import { Button } from "@/components/ui/button";

const UploadCourse = () => {
  const [contents, setContents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Now you have access to `contents` here!
    // You can send contents along with other course data to your backend
    // Example: console.log(contents);
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Upload Course</h1>
        <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course-title">
              Course Title
            </label>
            <input
              type="text"
              id="course-title"
              placeholder="Enter course title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="course-description">
              Course Description
            </label>
            <Editor />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="course-file">
              Upload Course File
            </label>
            <ContentManager contents={contents} setContents={setContents} />
            {/* <input
              type="file"
              id="course-file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /> */}
          </div>
          <Button type="submit">Upload Course</Button>
        </form>
      </div>
    </div>
  )
}

export default UploadCourse;