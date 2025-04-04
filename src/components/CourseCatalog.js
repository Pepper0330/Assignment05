import courses from '../data/courses.js';
import CourseItem from './CourseItem.js';
import { styled } from 'styled-components';

const CourseList = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: center;
`;

function CourseCatalog(props) {
    return (
        <div>
            <h2>Course Catalog</h2>
            <CourseList>
                {courses.map((course) => (
                    <CourseItem course={course} enroll={props.enroll(course)} key={course.id}/>
                ))}
            </CourseList>
        </div>
    );
}

export default CourseCatalog;