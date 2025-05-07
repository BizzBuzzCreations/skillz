import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge"
import courseThumbnail from "@/assets/thumbnail.jpg";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";


const UnitCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <section className="flex items-center justify-center px-10 py-5 gap-10">
        <div className="flex-1 space-y-3 mt-5">
          <h2 className="text-3xl font-medium">UI/UX Fundamentals</h2>
          <p className="text-lg">This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research.</p>
          <Button onClick={() => navigate(`${location.pathname}/player`)}>Start Learning <ChevronRight /></Button>
        </div>
        <div className="flex-1 bg-gray-100 p-3 rounded-xl shadow-md">
          <img src={courseThumbnail} alt="course video" className="rounded-xl" />
        </div>
      </section>

      <section className="text-center p-10">
        <h2 className="text-xl font-semibold">What You'll Learn</h2>
        <div className="grid grid-cols-2 justify-center items-center m-auto gap-5 mt-5 w-[80%] mx-auto">
          <div className="flex items-center gap-2">
            <FaRegCircleCheck className="text-blue-500 text-xl drop-shadow-md" />
            <p>Core principles of UI/UX design</p>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCircleCheck className="text-blue-500 text-xl drop-shadow-md" />
            <p>Designing for accessibility and inclusivity</p>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCircleCheck className="text-blue-500 text-xl drop-shadow-md" />
            <p>Wireframing and prototyping with popular tools</p>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCircleCheck className="text-blue-500 text-xl drop-shadow-md" />
            <p>Mobile-first and responsive design approaches</p>
          </div>

        </div>
      </section>

      <section className="text-center p-10">
        <h2 className="text-xl font-semibold">Skills You'll Gain</h2>
        <div className="flex flex-wrap justify-center items-center m-auto gap-5 mt-5 w-[80%] mx-auto">
          <Badge variant="outline" className="p-1 px-3 text-sm bg-gray-200">Interaction design</Badge>
          <Badge variant="outline" className="p-1 px-3 text-sm bg-gray-200">Usability evaluation</Badge>
          <Badge variant="outline" className="p-1 px-3 text-sm bg-gray-200">User research techniques</Badge>
          <Badge variant="outline" className="p-1 px-3 text-sm bg-gray-200">Prototyping and wireframing</Badge>
          <Badge variant="outline" className="p-1 px-3 text-sm bg-gray-200">Problem-solving with empathy</Badge>
        </div>
      </section>

      <section className="text-center p-10">
        <h2 className="text-xl font-semibold">Course Structure</h2>
        <div className="flex flex-wrap justify-center items-center m-auto gap-2 mt-5 w-[80%] mx-auto">
          <Accordion type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 !w-[100%]">
                  <p className="text-lg text-gray-800">Introduction to UI/UX</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Module 1</span> <LuDot /> <span>30 minutes to complete</span>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 !w-[100%]">
                  <p className="text-lg text-gray-800">Understanding Users</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Module 2</span> <LuDot /> <span>45 minutes to complete</span>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 !w-[100%]">
                  <p className="text-lg text-gray-800">Wireframes & Prototypes</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Module 3</span> <LuDot /> <span>1 hour to complete</span>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 !w-[100%]">
                  <p className="text-lg text-gray-800">Visual Design Principles</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Module 4</span> <LuDot /> <span>1 hour to complete</span>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 !w-[100%]">
                  <p className="text-lg text-gray-800">Accessibility & Usability</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Module 5</span> <LuDot /> <span>45 minutes to complete</span>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full rounded-lg px-5 shadow-md hover:bg-blue-50 transition duration-100 ease-in-out">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 !w-[100%]">
                  <p className="text-lg text-gray-800">Final Project & Feedback</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Module 6</span> <LuDot /> <span>2 hours to complete</span>
                  </div>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </>
  )
}

export default UnitCourse;