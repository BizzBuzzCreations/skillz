import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trimWords } from "@/utils/trimWords";
import { useNavigate } from "react-router-dom";



const CourseCard = ({ indexKey, title, description = "", price, thumbnail }) => {
    const navigate = useNavigate();
    // console.log("CourseCard Props:", { indexKey, title, description, price, thumbnail });
    return (
        <>
            <Card key={indexKey} className="flex gap-1 text-start p-2 w-96 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <img src={thumbnail} alt="course thumbnail" className="rounded-lg" />
                <div className="p-2">
                    <h3 className="text-slate-800 text-xl font-medium">{title}</h3>
                    <p className="text-slate-600">{trimWords(description)}</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-slate-800 text-lg font-semibold">{price}</span>
                        <Button className="rounded-3xl hover:rounded-md" onClick={() => navigate(`/course/${indexKey}`)}>Enroll Now</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default CourseCard;