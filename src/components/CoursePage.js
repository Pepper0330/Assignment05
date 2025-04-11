import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import CourseCatalog from './CourseCatalog.js';
import EnrollmentList from './EnrollmentList.js';
import { useEffect, useState, useContext } from 'react';
import AuthContext from './AuthContext';

function Homepage() {
    var [enrolledCourses, setEnrolledCourses] = useState([]);
    var [allCourses, setAllCourses] = useState([]);
    const { authStatus } = useContext(AuthContext);

    let { id } = authStatus;

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/student_courses/${id}`, {
            method: "GET",
            headers: {
                'Content-type':'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setEnrolledCourses(data))
        .catch((e) => console.error(e));

        fetch("http://127.0.0.1:5000/courses" , {
            method: "GET",
            headers: {
                'Content-type':'application/json'
            },
        }).then(response => response.json())
        .then(data => {
            if(data.length > 0){
                setAllCourses(data);
            }else{
                setAllCourses([]);
            }
        }
        ).catch((e) => console.error(e));
    }, [id]);

    const enroll = (course) => {
        console.log("enroll " + course.name);
        if (enrolledCourses.includes(course)) {
            return;
        }
        let enrolledCopy = [...enrolledCourses];
        enrolledCopy.push(course);

        fetch(`http://127.0.0.1:5000/enroll/${id}` , {
            method: "POST",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(course)
        }).then(resp => resp.json())
        .then(data => {
            if(!data.success){
                alert(data.message);
            }else{
                setEnrolledCourses(enrolledCopy);
            }
        }).catch((e) => console.error(e));

    };

    const unenroll = (course) => {
        console.log("unenroll " + course.name);

        let enrolledCopy = [...enrolledCourses];
        enrolledCopy.splice(enrolledCopy.indexOf(course), 1);

        fetch(`http://127.0.0.1:5000/drop/${id}` , {
            method: "DELETE",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(course)
        }).then(resp => resp.json())
        .then(data => {
            if(!data.success){
                alert(data.message);
            }else{
                setEnrolledCourses(enrolledCopy);
            }
        }).catch((e) => console.error(e));

    };

    return (
        <div className="courses-page">
            <Header />
                <div className="content">

                    {allCourses.length > 0 && <CourseCatalog enroll={(course) => enroll} courses={allCourses} />}
                    {enrolledCourses.length > 0 && <EnrollmentList courses={enrolledCourses} unenroll={(course) => unenroll(course)} />}
                </div>
            <Footer />
        </div>
    );
}

export default Homepage;