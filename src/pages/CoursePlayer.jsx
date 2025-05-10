import { LuDot } from "react-icons/lu";

const CoursePlayer = () => {
  return (
    <div className="flex flex-1 gap-10 px-10 py-5">

      <section className="flex-1">
        <iframe
          className="w-full  rounded-lg"
          width="560"
          height="560"
          src="https://www.youtube.com/embed/RqTEHSBrYFw?si=yCq-jEFZn15mvdcc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </section>

      <section className="w-64 flex flex-col gap-3">
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">What is UI/UX?</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 1</small>
            <LuDot />
            <small>05 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">Why UI/UX Matters in Product Design</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 1</small>
            <LuDot />
            <small>07 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">UX vs UI – What’s the Difference?</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 1</small>
            <LuDot />
            <small>06 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">Introduction to the Design Process</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 1</small>
            <LuDot />
            <small>07 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">Tools You'll Be Using</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 1</small>
            <LuDot />
            <small>05 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">What is UI/UX?</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 2</small>
            <LuDot />
            <small>05 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">Why UI/UX Matters in Product Design</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 2</small>
            <LuDot />
            <small>07 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">UX vs UI – What’s the Difference?</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 2</small>
            <LuDot />
            <small>06 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">Introduction to the Design Process</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 2</small>
            <LuDot />
            <small>07 minutes</small>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-semibold">Tools You'll Be Using</h4>
          <div className="flex items-center text-sm text-gray-600">
            <small>Module 2</small>
            <LuDot />
            <small>05 minutes</small>
          </div>
        </div>
      </section>

    </div>
  )
}

export default CoursePlayer;