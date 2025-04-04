import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import CourseCatalog from './CourseCatalog.js';
import EnrollmentList from './EnrollmentList.js';
import { useEffect, useState } from 'react';

function Homepage() {
    var [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        let enrolled = localStorage.getItem('courses');
        console.log(enrolled);
        if (enrolled == null) {
            console.log("enrolled is null");
            enrolled = [];
        }else{
            setEnrolledCourses(JSON.parse(enrolled));
        }
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
        setEnrolledCourses(enrolledCopy);
        localStorage.setItem('courses', JSON.stringify(enrolledCopy));
    };

    return (
        <div className="courses-page">
            <Header />
                <div className="content">
                    <CourseCatalog enroll={(course) => enroll} />
                    <EnrollmentList courses={enrolledCourses} unenroll={(course) => unenroll(course)} />
                </div>
            <Footer />
        </div>
    );
}

export default Homepage;