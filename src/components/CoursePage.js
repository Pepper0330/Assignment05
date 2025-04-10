import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import CourseCatalog from './CourseCatalog.js';
import EnrollmentList from './EnrollmentList.js';
import { useEffect, useState } from 'react';

const student_id = 1;

function Homepage() {
    var [enrolledCourses, setEnrolledCourses] = useState([]);
    var [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/student_courses/${student_id}", {
            methods: "GET",
            headers: {
                'Content-type':'application/json'
            },
        }).then((resp) => {
            if(resp == null){
            }else{
                setEnrolledCourses(JSON.parse(resp))
            }
        }).catch((e) => console.error(e));

        fetch("http://127.0.0.1:5000/courses" , {
            methods: "GET",
            headers: {
                'Content-type':'application/json'
            },
        }).then((resp) => {
            if(resp == null){
            }else{
                setAllCourses(JSON.parse(resp))
            }
        }).catch((e) => console.error(e));
    }, []);

    const enroll = (course) => {
        if (enrolledCourses.includes(course)) {
            return;
        }
        let enrolledCopy = [...enrolledCourses];
        enrolledCopy.push(course);


        setEnrolledCourses(enrolledCopy);
        localStorage.setItem('courses', JSON.stringify(enrolledCopy));
    };

    const unenroll = (course) => {
        console.log("unenroll " + course.name);

        let enrolledCopy = [...enrolledCourses];
        enrolledCopy.splice(enrolledCopy.indexOf(course), 1);

        fetch("http://127.0.0.1:5000/drop/${student_id}" , {
            methods: "DELETE",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.jsonify(course)
        }).then((resp) => {
            if(resp == null){
            }else{
                setAllCourses(JSON.parse(resp))
            }
        }).catch((e) => console.error(e));

        setEnrolledCourses(enrolledCopy);
        localStorage.setItem('courses', JSON.stringify(enrolledCopy));
    };

    return (
        <div className="courses-page">
            <Header />
                <div className="content">
                    <CourseCatalog enroll={(course) => enroll} courses={allCourses} />
                    <EnrollmentList courses={enrolledCourses} unenroll={(course) => unenroll(course)} />
                </div>
            <Footer />
        </div>
    );
}

export default Homepage;