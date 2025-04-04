import React from 'react';
import { styled } from 'styled-components';
import EnrolledCourse from './EnrolledCourse.js';

const CourseList = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: center;
`;


function EnrollmentList(props) {
    var enrolledCourses = props.courses;
    var creditHours = 0;

    let calcTotalCreditHours = () => {
        enrolledCourses.forEach((course) => {
            creditHours += course.creditHours
        });

        return creditHours;
    };

    return (
        <div>
            <h2>Enrolled Courses</h2>
            <CourseList>
                {enrolledCourses.map((course) => (
                    <EnrolledCourse course={course} unenroll={(course) => props.unenroll(course)} key={course.id}/>
                ))}
            </CourseList>
            <p>Total credit hours: {calcTotalCreditHours()}</p>
        </div>
    );
}

export default EnrollmentList;