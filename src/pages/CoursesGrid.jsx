import courseThumbnail from "@/assets/thumbnail.jpg";
import CourseCard from "../components/custom_ui/CourseCard";

const courseData = [
    {
        title: "UI/UX Fundamentals",
        description:
            "This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research.",
        price: "$49.99",
        thumbnail: courseThumbnail,
    },
];

const CoursesGrid = () => {
    return (
        <section className="flex flex-col items-center justify-center p-5">
            <h1 className="text-3xl font-bold mb-4 text-slate-800">Trending Courses</h1>
            <div className="flex flex-wrap gap-5 m-auto items-center justify-center">
                {/* {courseData.map((data, index) => ( */}
                <CourseCard
                    key="1"
                    indexKey="1"
                    title="UI/UX Fundamentals"
                    description="This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research."
                    price="$49.99"
                    thumbnail={courseThumbnail}
                />
                <CourseCard
                    key="2"
                    indexKey="2"
                    title="UI/UX Fundamentals"
                    description="This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research."
                    price="$49.99"
                    thumbnail={courseThumbnail}
                />
                <CourseCard
                    key="3"
                    indexKey="3"
                    title="UI/UX Fundamentals"
                    description="This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research."
                    price="$49.99"
                    thumbnail={courseThumbnail}
                />
                <CourseCard
                    key="4"
                    indexKey="4"
                    title="UI/UX Fundamentals"
                    description="This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research."
                    price="$49.99"
                    thumbnail={courseThumbnail}
                />
                <CourseCard
                    key="5"
                    indexKey="5"
                    title="UI/UX Fundamentals"
                    description="This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research."
                    price="$49.99"
                    thumbnail={courseThumbnail}
                />
                <CourseCard
                    key="6"
                    indexKey="6"
                    title="UI/UX Fundamentals"
                    description="This course covers the essentials of designing intuitive, user-centered digital products—from layout and visual hierarchy to usability, accessibility, and user research."
                    price="$49.99"
                    thumbnail={courseThumbnail}
                />
                {/* ))} */}
            </div>
        </section>
    );
};

export default CoursesGrid;
