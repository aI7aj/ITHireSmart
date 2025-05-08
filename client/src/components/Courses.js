import React, { useEffect } from "react";
import { getCourses } from "../API";
import { useNavigate } from "react-router-dom";
function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        navigate("/404");
      }
    };
    fetchCourses();
  }, [navigate]);

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course) => {
        return (
          <div>
             <h2>{course.courseTitle}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
