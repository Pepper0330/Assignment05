import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import course1 from '../images/course1.jpg';
import course2 from '../images/course2.jpg';

const StyledItem = styled.div`
    width: 25%;
    text-align: center;
    padding: 20px;
    margin: 0 15px 10px 0;
    background-color: #e6f2ff;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.1);
`;

const CourseImg = styled.img`
    width: 100%;
    border-radius: 5px;
`;

const StyledButton = styled.button`
    padding: 5px 8px;
    background-color: #004080;
    border: none;
    border-radius: 3px;
    color: #e6f2ff;
`;

function CourseItem(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <StyledItem onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <CourseImg src={props.course.image === "course1" ? course1 : course2} alt={props.course.name} />
            <h3>{props.course.name}</h3>
            <p>{props.course.instructor}</p>
            <p style={{display: (isHovered) ? "block" : "none"}}>{props.course.description}</p>
            <StyledButton onClick={() => props.enroll(props.course)}>Enroll Now</StyledButton>
        </StyledItem>
    );
}

export default CourseItem;