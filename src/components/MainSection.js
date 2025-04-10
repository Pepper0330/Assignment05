import React from 'react';
import { useEffect, useState } from 'react';
import './MainSection.css';

function MainSection() {
    const [testimonialsList, setTestimonialsList] = useState([]);

    useEffect(() => {
        // Fetch testimonials from API
        fetch("http://127.0.0.1:5000/testimonials", {
            method: "GET",
            headers: {
                'Content-type':'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            setTestimonialsList(data);
        })
        .catch(error => {
            console.error('Error fetching testimonials:', error);
        });
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
            <section id="reviews">
                <h2>Testimonials</h2>
                {testimonialsList.length >= 2 && (
                    <table className="testimonial">
                        <tbody>
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
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default MainSection;
