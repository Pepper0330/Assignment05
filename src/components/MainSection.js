import React from 'react';
import courses from '../data/courses.js';
import testimonials from '../data/testimonials.js';
import { useEffect, useState } from 'react';
import './MainSection.css';

function MainSection() {
    const [enrolledCourses, setEnrolledCourses] = useState(courses.slice(0, 3));
    const [testimonialsList, setTestimonialsList] = useState(testimonials.slice(0, 3));

    useEffect(() => {
        // shuffle the courses list
        const shuffledCourses = [...courses];
        for (let i = shuffledCourses.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCourses[i], shuffledCourses[j]] = [shuffledCourses[j], shuffledCourses[i]];
        }
        // update the courses state with the shuffled list
        setEnrolledCourses(shuffledCourses.slice(0, 3));

        // shuffle the testimonials list
        const shuffledTestimonials = [...testimonials];
        for (let i = shuffledTestimonials.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledTestimonials[i], shuffledTestimonials[j]] = [shuffledTestimonials[j], shuffledTestimonials[i]];
        }
        // update the testimonials state with the shuffled list
        setTestimonialsList(shuffledTestimonials.slice(0, 3));
    }, []);

    return (
        <div>
            <section id="about">
                <h2>About LMS</h2>
                <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
                <h3>Key Features:</h3>
                <div>
                    <p>- Enroll in courses</p>
                    <p>- Attempt quizzes</p>
                    <p>- View leaderboards</p>
                </div>
                <hr />
            </section>
            <section id="courses">
                <h2>Featured Courses</h2>
                <table class="cv">
                    <tr>
                        <td>
                            <div>
                                <img src={enrolledCourses[0].image} alt={enrolledCourses[0].name} />
                                <h3>{enrolledCourses[0].name}</h3>
                                <p>{enrolledCourses[0].description}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={enrolledCourses[1].image} alt={enrolledCourses[1].name} />
                                <h3>{enrolledCourses[1].name}</h3>
                                <p>{enrolledCourses[1].description}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img src={enrolledCourses[2].image} alt={enrolledCourses[2].name} />
                                <h3>{enrolledCourses[2].name}</h3>
                                <p>{enrolledCourses[2].description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
                <hr />
            </section>
            <section id="reviews">
                <h2>Testimonials</h2>
                <table class="testimonial">
                    <tr>
                        <td>
                            <div>
                                <h2>{testimonialsList[0].courseName}</h2>
                                <h3>{testimonialsList[0].rating}/5</h3>
                                <h3>{testimonialsList[0].studentName}</h3>
                                <p>{testimonialsList[0].review}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <h2>{testimonialsList[1].courseName}</h2>
                                <h3>{testimonialsList[1].rating}/5</h3>
                                <h3>{testimonialsList[1].studentName}</h3>
                                <p>{testimonialsList[1].review}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </section>
        </div>
    );
}

export default MainSection;