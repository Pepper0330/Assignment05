import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
    width: 25%;
    text-align: center;
    padding: 20px;
    margin: 0 15px 10px 0;
    background-color: #e6f2ff;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
    padding: 5px 8px;
    background-color: #004080;
    border: none;
    border-radius: 3px;
    color: #e6f2ff;
`;


function EnrolledCourse(props) {
    return (
        <StyledItem>
            <h3>{props.course.name}</h3>
            <p>Credit Hours: {props.course.creditHours}</p>
            <StyledButton onClick={() => props.unenroll(props.course)}>Drop course</StyledButton>
        </StyledItem>
    );
}

export default EnrolledCourse;